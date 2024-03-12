# 如何将TinyEngine的区块发布到npm私仓
  
  撰写人：欧阳@上海启业信息技术有限公司(stwflyfox@163.com)


## 前言

  TinyEngine提供了强大的区块功能及发布方案(https://opentiny.design/tiny-engine#/help-center/course/backend/52)，
  但由于发布到公有的 npm 速度很慢影响开发效率，且国内经常访问不了 unpkg 导至无法显示发布后的区块内容, 
  另外区块里经常会包含业务内容，发布到公网上也有安全隐患，因此将区块发布到 npm 私仓就势在必行了。


## 安装 verdaccio

  有很多搭建 npm 私仓的方案，如: verdaccio, neuxs, cnpmjs 等，在此推荐使用 verdaccio，它是一个轻量级的简单易用的 npm 私仓，
  可以参考: https://blog.csdn.net/qq_40881695/article/details/125046492 安装 verdaccio ，
  在安装完成测试后， 访问 http://localhost:4873/ ，在 verdaccio 的管理界面能看到发布上去的npm包表示安装成功。
  建议发布的测试包名称格式：@公司码/组件名，以便于后续搭建 unpkg 时测试使用。


## 安装 unpkg

  verdaccio私仓安装好后，还要安装 unpkg ，才能在TinyEngine的页面上显示你所建的区块。 unpkg 的实现原理其实很简单，
  就是解析 npm 包的 package.json 文件，从中获取到 main 字段，进而读取 npm 包里的 js 文件， 然后将该文件路径转换成可访问的url。
  大家可以用 git clone 或 fork : https://github.com/stwflyfox/unpkg 我所修改的代码， 再修改成符合自己要求的代码，
  重点要修改的是：npmConfig.js 的 scrops ，将 @shqy 改成 @自已公司码 , 修改完成后, 执行：
    npm install
    npm run build
    npm run start
  访问 http://localhost:8080/ 即可看到 unpkg 服务启动成功，
  然后访问之前发布的测试包： http://localhost:8080/@公司码/组件名 ，如能显示 js 文件内容, 则表示 unpkg 安装成功。


## 修改 tiny-engine-webservice

 - 修改 \app\service\material-center\blockBuilder.ts 的 代码:
 
    generatePackageJson(blockInfo, version) {
        let { label, id } = blockInfo
        label = label.replace(/\W|_/g, '').toLocaleLowerCase() || 'default'
        //const env = 'alpha' || 'dev'
        const name = `@shqy/tinyengine-block-${label}-${id}` // 发包的名称根据自己情况更改, @shqy改成 @你自己的公司码
        this.pkgName = name
        return {
        name,
        version,
        description: '',
        main: 'js/web-component.es.js',  // main 必须是 js/web-component.es.js , 否则 unpkg 无法读取到 js
        keywords: [],
        author: '',
        license: 'ISC'
        }
    }


 - 修改 \app\service\cnpm.ts 的代码：

        async loginInNpm(packagePath) {
            const commands = [
            'npm config set strict-ssl false',
            `npm config set registry http://127.0.0.1:4873`,         
            `npm config set _auth xxxxxxxxxx`  // auth授权码是你发布组件到npm私仓的 用户名:密码 进行 base64 编码后的结果，访问 https://www.matools.com/base64 可做base64编码
            ];
            return this.ctx.helper.execCommandWithCatch(commands, { cwd: packagePath }, 'login npm');
        }

        async publishCnpm(packagePath) {
            const commands = ['npm publish --registry http://127.0.0.1:4873/'];
            return this.ctx.helper.execCommandWithCatch(commands, { cwd: packagePath }, 'publish cnpm');
        }
    
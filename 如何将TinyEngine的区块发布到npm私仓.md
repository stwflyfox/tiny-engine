# 如何将TinyEngine的区块发布到npm私仓

  撰写人：欧阳@上海启业信息(stwflyfox@163.com)
 

## 前言

  TinyEngine提供了强大的区块功能及发布方案(https://opentiny.design/tiny-engine#/help-center/course/backend/52)，
  但由于发布到公有的 npm 速度很慢影响开发效率，且国内经常访问不了 unpkg 导至无法显示发布后的区块内容。 
  另外区块里经常会包含业务内容，发布到公网上也有安全隐患，因此将区块发布到 npm 私仓就势在必行了。


## 安装 verdaccio

  现有很多搭建 npm 私仓的方案，如: verdaccio, neuxs, cnpmjs 等，在此推荐使用 verdaccio，它是一个轻量级的简单易用的 npm 私仓，
  各位可以参考: https://blog.csdn.net/qq_40881695/article/details/125046492 安装 verdaccio ，
  在安装并完成测试后， 访问 http://localhost:4873/ ，在 verdaccio 的管理界面能看到发布上去的npm包表示安装成功。
  建议发布的测试包名称格式：@公司码/组件名，以便于后续搭建 unpkg 时测试使用。以下是测试用的package.json供参考：
![a44044e173a1d209642c25f8bb03201a_package](https://github.com/stwflyfox/tiny-engine/assets/3983204/d50efa4e-9477-4dac-bf57-dfb750374761)

  


## 安装 unpkg

  在 verdaccio 安装好后，还要安装 unpkg ，才能在TinyEngine的页面上显示你所建的区块。 unpkg 的实现原理其实很简单，
  就是解析 npm 包的 package.json 文件，从中获取到 main 字段，进而读取 npm 包里的 js 文件， 然后将该文件路径转换成可访问的url。
  各位可以用 git clone : https://github.com/stwflyfox/unpkg 我所修改的代码， 修改成符合自己要求的代码，
  重点要修改的是：**npmConfig.js** 的 **scrops** ，将 @shqy 改成 @自已公司码 , 以及 **privateNpmRegistryURL** 改成自己的 verdaccio 私仓地址。
![d080139b923d269dd556a08c42a5d3d2_npmConfig](https://github.com/stwflyfox/tiny-engine/assets/3983204/f64d9f62-f17f-4d52-854e-78179ac9d3d7)



  修改完成后, 执行：
```
   npm install
   npm run build
   npm run start
```
  访问 http://localhost:8080/ 能看到 unpkg 服务启动成功，
![09a30fb7e74d49e90814c53c87030dfd_unpkg](https://github.com/stwflyfox/tiny-engine/assets/3983204/faeeccdc-01a2-4f9c-84c6-7c10f3c33c5d)

  

  然后访问之前发布的测试包： http://localhost:8080/@公司码/组件名 ，如能显示 js 文件内容, 则表示 unpkg 安装成功。
![e60c82f4e668a29d4fea096d28a1c0bd_componets](https://github.com/stwflyfox/tiny-engine/assets/3983204/3e565188-ae44-4646-b6fc-933ad93f4f04)


## 修改 tiny-engine-webservice

 - 修改 \app\service\material-center\blockBuilder.ts 的 代码:
   
```
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
        main: `js/web-component.es.js`,  // main 必须是 js/web-component.es.js , 否则 unpkg 无法读取到 js 文件
        keywords: [],
        author: '',
        license: 'ISC'
        }
    }
```

 - 修改 \app\service\cnpm.ts 的代码：
  
```
async loginInNpm(packagePath) {
            const commands = [
            'npm config set strict-ssl false',
            `npm config set registry http://127.0.0.1:4873`,     // verdaccio 的访问地址    
            `npm config set //127.0.0.1:4873/:_auth xxxxxxxxxx`  // auth授权码是你发布组件到npm私仓的 用户名:密码 进行 base64 编码后的字符串， https://base64.us/ 可做base64线上编码
            ];
            return this.ctx.helper.execCommandWithCatch(commands, { cwd: packagePath }, 'login npm');
        }
```

```
async publishCnpm(packagePath) {
          const commands = ['npm publish --registry http://127.0.0.1:4873/'];
          return this.ctx.helper.execCommandWithCatch(commands, { cwd: packagePath }, 'publish cnpm');
      }
```

## 在 TinyEngine 中发布区块
  以上步骤完成后，即可在TinyEngine中愉快的发布及使用区块了，各位可以查看 tiny-engine-webservice的发布过程用以排查问题，
TinyEngine会生成组件包:
![a3a1b8133cb165bfc7c8c363ae7b10b1_build](https://github.com/stwflyfox/tiny-engine/assets/3983204/7f40abbf-2e60-40d9-a712-50eb0cf65fbc)

  然后发布到私仓:
![8a4399131670bb1842ec4e3a91a21d3c_published](https://github.com/stwflyfox/tiny-engine/assets/3983204/7b4a222f-065b-4801-b801-978d68a72409)

附注：如果用 TinyEngine 发布到npm私仓发生权限问题时，可以用手动登录方式后再重新尝试发布区块
```
npm config set registry http://127.0.0.1:4873
npm login
```

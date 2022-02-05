# 单点登录

你肯定会希望所有系统都可以使用同一套帐户系统进行登录，这时候我们就需要进行单点登录的配置了，虽然有很多商业化的身份供应商可以使用，但那都会造成不低的成本支出，所以我们只考虑以开源项目为基础来配置单点登录功能。

原理很简单，一共需要以下几步的操作:

`准备工作`
1. 需要一个SSO服务端来提供身份认证以及用户管理(如NextCloud)
2. 然后在客户端(如Gitea)配置连接到SSO服务器端的参数

`日常使用`

1. 在SSO服务端添加一个新用户(如NextCloud)
2. 在客户端(如Gitea)添加一个同名用户，并设置为使用OAuth2或OIDC通过SSO服务器认证登录
3. 在客户端为此用户分配相应权限


## 名词解释

OpenID: 去中心化的网上身份认证协议规范

OAuth2: 去中心化的网上身份授权协议规范

OpenID Connect: 简称OIDC，它是OAuth2的进化版本，同时具有认证与授权功能

Dex: 由CoreOS发布的开源项目，作为各种身份供应器的代理，提供OIDC与OAuth2服务

## 身份供应器类型选择

OAuth2: 可使用任何邮箱地址

LDAP: 仅可使用公司邮箱地址

其它: 反正决定自己管，其它的我们就不说了


## 安全问题

虽然Gitea或GitLab都有身份供应器功能，但从安全角度考虑极力推荐使用NextCloud或OpenLDAP作为SSO供应器，因为随着项目的发展添加用户的权限可能会由专人负责，在这种情况下将会让源码管理变的不安全。

## 代码管理

Gitea或GitLab使用OAuth2或OIDC进行用户认证后，版本管理程序(如SourceTree)将无法使用http方式的用户名+密码提交代码，需使用SSH方式，方法可参阅[Github教程](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/about-ssh)

## 剩余内容

东西很多，你们先忍一忍，很快就好了

(2022-02-06)
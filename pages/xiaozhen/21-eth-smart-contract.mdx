import Image from 'next/image';

## 智能合约

智能合约是运行在区块链上的一段代码，代码的逻辑定义了合约的内容。

智能合约的账户保存了合约当前的运行状态：

- balance - 当前余额
- nonce - 交易次数
- code - 合约代码
- storage - 存储，数据结构是一颗 MPT

Solidity 是智能合约最常用的语言，语法上与 JavaScript 很接近。

## 智能合约代码结构

<Image src="/xiaozhen/21-eth-smart-contract-1.png" alt="eth-smart-contract-1" width={720} height={720} />

> 注意：有需要接受外部转账的函数，函数都需要修饰为 `payable`，否则会抛出异常。

## 外部账户如何调用智能合约？

创建一个交易，接收地址为要调用的那个智能合约的地址，data 域填写要调用的函数及其参数的编码值，如下图所示。

<Image src="/xiaozhen/21-eth-smart-contract-2.png" alt="eth-smart-contract-2" width={720} height={720} />

### 1. 一个合约如何调用另一个合约中的函数？
1、直接调用的方式

<Image src="/xiaozhen/21-eth-smart-contract-3.png" alt="eth-smart-contract-3" width={720} height={720} />

> 注意：**合约地址只能由外部地址发起交易，合约地址不能主动发起交易**。所以，上图最原始一定是有一个外部地址发起合约 B，合约 B 才能调用合约 A。

2、使用 `address` 类型的 `call()` 函数的方式

<Image src="/xiaozhen/21-eth-smart-contract-4.png" alt="eth-smart-contract-4" width={720} height={720} />

这两种方式的区别：**直接调用**方式，被调用的合约出现异常，调用合约的一方也会异常，叫做异常回滚；**使用 call 调用方式**，被调用的合约出现异常只会返回 false，调用合约的一方继续运行。

3、代理调用 `delegatecall()` 方式

<Image src="/xiaozhen/21-eth-smart-contract-5.png" alt="eth-smart-contract-5" width={720} height={720} />

4、`fallback` 函数

<Image src="/xiaozhen/21-eth-smart-contract-6.png" alt="eth-smart-contract-6" width={720} height={720} />

## 智能合约的创建与运行

智能合约的代码写完后，要编译成 **bytecode**。

创建智能合约：外部地址发起一个转账交易到 **0x0** 的地址。

- 转账的金额为 0，但是要支付 gas 费，
- 合约的代码放在 data 域里。

智能合约运行在 EVM（Ethereum Virtual Machine）上。

以太坊是一个交易驱动的状态机：调用智能合约的交易发布到区块链上后，每个矿工都会执行这个交易，从当前状态确定性地转移到下一个状态

## 汽油费（gas fee）

<Image src="/xiaozhen/21-eth-smart-contract-7.png" alt="eth-smart-contract-7" width={720} height={720} />

## 错误处理

<Image src="/xiaozhen/21-eth-smart-contract-8.png" alt="eth-smart-contract-8" width={720} height={720} />

## 嵌套调用

<Image src="/xiaozhen/21-eth-smart-contract-9.png" alt="eth-smart-contract-9" width={720} height={720} />

## Block Header 中的汽油费

<Image src="/xiaozhen/21-eth-smart-contract-10.png" alt="eth-smart-contract-10" width={720} height={720} />

- GasUsed - 区块中所有交易所花费 gas fee 的总额。
- GasLimit - 表示这个区块能消耗 gas fee 的上限，如比特币有 1M 的区块大小限制，同样这个 gasLimit 可以限制区块中能够包含的交易数量。这个值可以让矿工进行 **1/1024** 的幅度的上下微调，所以
这个值会趋于所有矿工的平均意见。

## 收据树-Receipt 数据结构

<Image src="/xiaozhen/21-eth-smart-contract-11.png" alt="eth-smart-contract-11" width={720} height={720} />

- Status：用于判断交易是否成功。

## 智能合约可以获得的区块信息

<Image src="/xiaozhen/21-eth-smart-contract-12.png" alt="eth-smart-contract-12" width={720} height={720} />

## 智能合约可以获得的调用信息

<Image src="/xiaozhen/21-eth-smart-contract-13.png" alt="eth-smart-contract-13" width={720} height={720} />

## 地址类型

<Image src="/xiaozhen/21-eth-smart-contract-14.png" alt="eth-smart-contract-14" width={720} height={720} />

## 例子-简单拍卖

<Image src="/xiaozhen/21-eth-smart-contract-15.png" alt="eth-smart-contract-15" width={720} height={720} />
<Image src="/xiaozhen/21-eth-smart-contract-16.png" alt="eth-smart-contract-16" width={720} height={720} />

**上图2**，存在什么问题？

<Image src="/xiaozhen/21-eth-smart-contract-17.png" alt="eth-smart-contract-17" width={720} height={720} />

如果黑客发起攻击，拍卖结束，退款时，所有参与拍卖的人都会收不到钱，包括拍卖胜出者。看看下面第二个版本。

## 第二个版本-简单拍卖

<Image src="/xiaozhen/21-eth-smart-contract-18.png" alt="eth-smart-contract-18" width={720} height={720} />

这样可以了吗？当有黑客如下图那样，会发起**重入攻击**：

<Image src="/xiaozhen/21-eth-smart-contract-19.png" alt="eth-smart-contract-19" width={720} height={720} />

修改后：

<Image src="/xiaozhen/21-eth-smart-contract-20.png" alt="eth-smart-contract-20" width={720} height={720} />
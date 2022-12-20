import Image from 'next/image';

以太坊采用基于账户的模式，系统中显式记录每个账户的余额。而以太坊这样一个大型分布式系统中，是采用什么样的数据结构来实现对这些数据的管理的。

## 介绍
首先，我们要实现从**账户地址到账户状态的映射**。在以太坊中，账户地址为**160**字节，表示为40个16进制数额。状态包含了**余额(balance)**、**交易次数(nonce)**，如果是合约账户，则还
包含了**code(代码)**、**存储(storage)**。

直观地来看，其本质上为Key-value键值对，所以直观想法便用哈希表实现。若不考虑哈希碰撞，查询直接为常数级别的查询效率。但采用哈希表，就难以提供 Merkle proof。

> 注意：在BTC和以太坊中，交易保存在区块内部，一个区块可以包含多个交易。通过区块构成区块链，而非交易。

**思考一下如何组织账户的数据结构？**

**1、我们能否像 BTC 中，将哈希表的内容组织为 Merkle Tree？** 但当新区块发布，哈希表内容会改变，再次将其组织为新的 Merkle Tree。如果这样，每当产生新区块(ETH中新区块产生时间为10s左右)，都
要重新组织 Merkle Tree，很明显这是不现实的。

需要注意的是，比特币系统中没有账户概念，交易由区块管理，而区块包含上限为4000个交易左右，所以Merkle Tree不是无限增大的。而 ETH 中，用 Merkle Tree 来组织账户信息，很明显其会越来越庞大。

实际中，发生变化的仅仅为很少一部分数据，我们每次重新构建 Merkle Tree 代价很大。

**2、那我们不要哈希表了，直接使用 Merkle Tree，每次修改只需要修改其中一部分即可，这个可以吗？** 实际中，Merkle Tree 并未提供一个高效的查找和更新的方案。此外，将所有账户构建为一个大的 
Merkle Tree，为了保证所有节点的一致性和查找速度，必须进行排序。

**3、那么经过排序，使用Sorted Merkle Tree可以吗？** 新增账户，由于其地址随机，插入 Merkle Tree 时候很大可能在Tree中间，发现其必须进行重构。所以 Sorted Merkle Tree 插入、删除(实际上
可以不删除)的代价太大。

既然哈希表和 Merkle Tree 都不可以，那么我们看一下实际中以太坊采取的数据结构：**MPT**。

> BTC 系统中，虽然每个节点构建的 Merkle Tree 不一致（不排序），但最终是获得记账权的节点的 Merkle Tree 才是有效的。

## 数据结构——trie(字典树、前缀树)

<Image src="/xiaozhen/15-eth-state-tree-1.png" alt="eth-state-tree-1" width={720} height={720} />

上图为一个由5个单词组成的 **trie** 数据结构（只画出key，未画出value）。它有如下特点：

1. trie 中每个节点的分支数目取决于Key值中每个元素的取值范围(图例中最多26个英文字母分叉 + 一个结束标志位)。
2. trie 查找效率取决于 key 的长度。实际应用中（以太坊地址长度为**160byte**）。
3. 理论上哈希会出现碰撞，而 trie 上面不会发生碰撞。
4. 给定输入，无论如何顺序插入，构造的 trie 都是一样的。
5. 更新操作局部性较好。

**那么 trie 有缺点吗？** 当然有：trie 的存储浪费。很多节点只存储一个key，但其子节点只有一个，过于浪费。因此，为了解决这一问题，以太坊引入**帕特丽夏树(Patricia tree/trie)**。

## 帕特丽夏树（Patricia tree）
**Patricia trie** 就是进行了路径压缩的 trie。如上图例子，进行路径压缩后如下图所示：

<Image src="/xiaozhen/15-eth-state-tree-2.png" alt="eth-state-tree-2" width={720} height={720} />

需要注意的是，如果新插入单词，原本压缩的路径可能需要扩展开来。那么，**需要考虑什么情况下路径压缩效果较好？** 树中插入的键值分布较为稀疏的情况下，可见路径压缩效果较好。

在以太坊系统中，160位的地址存在 **2^160** 种，该数实际上已经非常大了，和账户数目相比，可以认为地址这一键值非常稀疏。

因此，我们可以在以太坊账户管理中使用 Patricia tree 这一数据结构！但实际上，在以太坊中使用的并非简单的 **PT(Patricia tree)**，而是 **MPT(Merkle Patricia tree)**。

## MPT（Merkle Patricia tree）
**Merkle Tree** 和 **Binary Tree** 区块链和链表的区别在于区块链使用哈希指针，链表使用普通指针。同样，Merkle Tree 相比 Binary Tree，也是普通指针换成了哈希指针。

所以，以太坊系统可以这样，**将所有账户组织为一个经过路径压缩和排序的 Merkle Tree，其根哈希值存储于block header中**。

> 注意，BTC 系统中只有一个交易组成的Merkle Tree，而以太坊中有三个(三棵树)。也就是说，在以太坊的block header中，存在有三个根哈希值。

根哈希值的用处：

1. 防止篡改。
2. 提供 Merkle proof，可以证明账户余额，轻节点可以进行验证。
3. 证明某个发生了交易的账户是否存在。

**MPT(Merkle Patricia tree)** - 以太坊中针对MPT(Merkle Patricia tree)进行了修改，我们称其为**MPT(Modified Patricia tree)**。

下图为以太坊中使用的 MPT 结构示意图。右上角表示四个账户(为直观，显示较短地址)和其状态(只显示账户余额)。(需要注意这里的指针都是哈希指针)

<Image src="/xiaozhen/15-eth-state-tree-3.png" alt="eth-state-tree-3" width={720} height={720} />

每次发布新区块，状态树中部分节点状态会改变。但改变并非在原地修改，而是新建一些分支，保留原本状态。如下图中，仅仅有新发生改变的节点才需要修改，其他未修改节点直接指向前一个区块中的对应节点。

<Image src="/xiaozhen/15-eth-state-tree-4.png" alt="eth-state-tree-4" width={720} height={720} />

所以，系统中全节点并非维护一棵MPT，而是每次发布新区块都要新建MPT。只不过大部分节点共享。

> 为什么要保存原本状态？为何不直接修改？为了便于**回滚**。

## 以太坊中的数据结构
### 1. 块头数据结构

<Image src="/xiaozhen/15-eth-state-tree-5.png" alt="eth-state-tree-5" width={720} height={720} />

解释：

- parentHash - 父区块的哈希，即前一个区块的哈希值
- UncleHash - 叔父区块的哈希
- Coinbase - 矿工地址
- Root - 状态树根哈希
- TxHash - 交易树根哈希
- ReceiptHash - 收据树根哈希
- Bloom - 布隆过滤器，用于**查询**，和**收据树**相关
- Difficulty - 挖矿难度
- Gaslimit、GasUsed - 跟 gas 费相关
- Time - 区块大致产生的时间
- MixDigest、Nonce - 和挖矿过程相关

### 2. 区块结构

<Image src="/xiaozhen/15-eth-state-tree-6.png" alt="eth-state-tree-6" width={720} height={720} />

解释：

- header - 执行 block header 的指针
- uncles - 指向叔父区块的指针
- transactions - 交易列表

### 3. 对外区块

<Image src="/xiaozhen/15-eth-state-tree-7.png" alt="eth-state-tree-7" width={720} height={720} />

## 结论
状态树中保存Key-value对，key就是地址，而value状态通过 **RLP(Recursive Length Prefix，一种进行序列化的方法)** 编码序列号之后再进行存储。
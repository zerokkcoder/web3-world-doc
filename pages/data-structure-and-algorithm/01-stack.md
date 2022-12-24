## 1. 栈的介绍

**栈是限制插入和删除只能在一个位置上进行的线性表。** 其中，允许插入和删除的一端位于表的末端，叫做栈顶(top)，不允许插入和删除的另一端叫做栈底(bottom)。
对栈的基本操作有 **PUSH(压栈)** 和 **POP(出栈)**，前者相当于表的插入操作(向栈顶插入一个元素)，后者则是删除操作(删除一个栈顶元素)。栈是一种
**后进先出(LIFO)**的数据结构，最先被删除的是最近压栈的元素。

### 1.1 栈实现

由于栈是一个表，因此任何实现表的方法都可以用来实现栈。主要有两种方式，链表实现和数组实现。

### 1.2 链表实现栈

可以使用单链表来实现栈。通过在表顶端插入一个元素来实现 PUSH，通过删除表顶端元素来实现 POP。使用链表方式实现的栈又叫**动态栈**。动态栈有链表的部分特性，
即元素与元素之间在屋里存储上可以不连续，但是功能有些受限制，动态栈只能在栈顶处进行插入和删除操作，不能再栈尾或栈中间进行插入和删除操作。

### 1.3 数组实现栈

栈也可以用数组来实现。使用数组方式实现的栈叫**静态栈**。

## 2. 栈的应用场景

- 子程序的调用：在跳往子程序前，会先将下个指令的地址存到堆栈中，知道子程序执行完后再将地址取出，以回到原来的程序中。
- 处理递归调用：和子程序的调用类似，只是除了存储下一个指令的地址外，也将参数、区域变量等数据存储堆栈中。
- 表达式的转换[中缀表达式转后缀表达式]与求值(实际解决)。
- 二叉树的遍历。
- 图的深度优先(depth-first)搜索法。

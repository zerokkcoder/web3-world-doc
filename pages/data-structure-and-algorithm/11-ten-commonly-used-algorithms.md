import Image from 'next/image';

## 1. 二分查找算法

### 1.1 二分查找算法介绍

当我们要从一个序列中查找一个元素的时候，二分查找时一种非常快速的查找算法，二分查找又叫折半查找。它对要查找的序列有两个要求，一是该序列必须是有序的(即该序列中的所有元素都是按照大小关系排好序的，升序和降序都可以，本文假设都是升序排列的)，二是该序列必须是顺序存储的。下图展示的就是一个能进行二分查找的序列。

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-1.png" alt="ten-commonly-used-algorithms-1" width={720} height={720} />

## 2. 分治算法

### 2.1 分治算法介绍

分治算法的基本思想是将一个规模为 N 的问题分解为 K 个规模较小的子问题，这些子问题相互独立且与原问题性质相同。求出子问题的解，既可以得到原问题的解。

### 2.2 分治算法示意图

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-2.png" alt="ten-commonly-used-algorithms-2" width={720} height={720} />

### 2.3 分治算法步骤

1. 分解，将要解决的问题划分成若干个规模较小的同类问题
2. 求解，当子问题划分得足够小时，用较简单的方法解决
3. 合并，按原问题的要求，将子问题的解逐层合并构成原问题的解。

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-3.png" alt="ten-commonly-used-algorithms-3" width={720} height={720} />

假如把 16 个硬币的例子看成一个大的问题。
- 第一步，把这一问题分成两个小问题。随机选择 8 个硬币作为第一组称为A组，剩下的8个硬币作为第二组称为B组。这样，就把16个硬币的问题分成两个8硬币的问题来解决。
- 第二步，判断A和B组中是否有伪币。可以利用仪器来比较A组硬币和B组硬币的重量。假如两组硬币重量相等，则可以判断伪币不存在。假如两组硬币重量不相等，则存在伪币，并且可以判断它位于较轻的那一组硬币中。
- 最后，用第三步的结果得出原先16个硬币问题的答案。

若仅仅判断硬币是否存在，则第三步非常简单。无论A组还是B组中有伪币，都可以判断这16个硬币中存在伪币。因此，仅仅通过一次重量的比较，就可以判断伪币是否存在。

## 3. 动态规划算法

### 3.1 动态规划算法介绍

动态规划算法通常用于求解具有某种最优性质的问题。在这类问题中，可能会有许多可行解。每一个解都应对于一个值，我们希望找到具有最优值的解。动态规划算法与分治法类似，其基本思想也是将待求解问题分解成若干子问题，先求解子问题，然后从这些子问题的解得到原问题的解。与分治不同的是，适合于用动态规划求解的问题，经分解得到子问题往往不是互相独立的。若用分治法来解这类问题，则分解得到的子问题树木太多，有些子问题被重复计算了很多次。如果我们能够保持已解决的子问题的答案，而在需要时再找出已求得的答案，这样就可以避免大量的重复计算，节省时间。我们可以用一个表来记录所有已解的子问题的答案。不管该子问题以后是否被用到，只要它被计算过，就将其结果填入表中。这就是动态规划法的基本思路。具体的动态规划算法多种多样，但它们具有相同的填表格式。

### 3.2 动态规划算法实现

给定一个矩阵 m，从左上角开始每次只能向右或向下走，最后达到右下角的位置，路径中所有数字累加起来就是路径和，返回所有路径的最小路径和，如果给定的 m 如下，那么路径1，3，1，0，6，1，0 就是最小路径和，返回 12。如下图：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-4.png" alt="ten-commonly-used-algorithms-4" width={720} height={720} />

## 4. KMP 算法

### 4.1 朴素匹配算法介绍

一个字符串(模式串)在另一个字符串(主串)中的位置，称为字符串模式匹配。

在朴素的字符串模式匹配算法中，我们对主串 S 和模式串 T 分别设置指针 i 和 j，假设字符串下标从 0 开始，初始时 i 和 j 分别指向每个串的第 0 个位置。在第 n 趟匹配开始时，i 指向主串 S 中的第 n-1 个位置，j 指向模式串 T 的第 0 个位置，然后逐个向后比较。若 T 中的每一个字符都与 S 中的字符相等，则称匹配成功，否则，当遇到某个字符不相等时， i 重新指向 S 的第 n 个位置，j 重新指向 T 的第 0 个位置，继续进行第 n+1 趟匹配。

### 4.2 朴素算法匹配规则

例如一：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-5.png" alt="ten-commonly-used-algorithms-5" width={720} height={720} />

朴素算法进行匹配：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-6.png" alt="ten-commonly-used-algorithms-6" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-7.png" alt="ten-commonly-used-algorithms-7" width={720} height={720} /> 

可以看出，用朴素算法进行匹配时，第二，三，四，五次匹配均为没有必要的，因为子串自身无重复，且子串与主串的 0-4 位相等，所以子串的第 0 位必定与主串的第1，2，3，4位不等。

### 4.3 KMP算法介绍

在进行字符串匹配时，KMP算法与朴素算法最大的区别就在于KMP算法省去了主串与子串不必要的回溯，这也是 KMP 算法(在主串有较多重复时)更加高效的关键。

KMP 算法进行匹配：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-8.png" alt="ten-commonly-used-algorithms-8" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-9.png" alt="ten-commonly-used-algorithms-9" width={720} height={720} /> 

从上述例子可以看出 KMP 算法的第一个优点：避免了主串不必要的回溯。事实上，主串的任何回溯都是不必要的，所以在KMP算法中，任何情况下主串都不回溯。

例二：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-10.png" alt="ten-commonly-used-algorithms-10" width={720} height={720} /> 

朴素匹配进行匹配：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-11.png" alt="ten-commonly-used-algorithms-11" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-12.png" alt="ten-commonly-used-algorithms-12" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-13.png" alt="ten-commonly-used-algorithms-13" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-14.png" alt="ten-commonly-used-algorithms-14" width={720} height={720} /> 

这一次，子串自身出现了重复，即第 0-1 位的 ab 和第 3-4 位的 ab 相等，所以若继续按照例一的方式避免子串的回溯，就会出现下面的情况：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-15.png" alt="ten-commonly-used-algorithms-15" width={720} height={720} /> 

所以第四次匹配时必要的，不能跳过。但第二，三次匹配也是必要的吗？不难看出，答案是否定的。

KMP 算法进行匹配：

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-16.png" alt="ten-commonly-used-algorithms-16" width={720} height={720} /> 

<Image src="/data-structure-and-algorithm/11-ten-commonly-used-algorithms-17.png" alt="ten-commonly-used-algorithms-17" width={720} height={720} /> 

由于在进行第一次匹配时，我们已经知道主串的 3-4 位为 ab，所以在第二次匹配中，我们完全可以直接让主串的第 5 位与子串的第 3 位进行比较，来避免子串不必要的回溯，减少比较次数，这也是KMP算法的第二个优点。

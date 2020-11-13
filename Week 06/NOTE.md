## 语言按语法分类：
- 非形式语言
  - 中文、英文
- 形式语言
  - 0型文法（无限制文法或短语结构文法）包括所有的文法。
  - 1型文法（上下文相关文法）生成上下文相关语言。
  - 2型文法（上下文无关文法）生成上下文无关语言。
  - 3型文法（正规文法）生成正则语言。

## 生产式（BNF）
- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称终结符
  - 符合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- * 表示重复多次
- | 表示或
- + 表示至少一次

> 这段课程看的有些懵逼，于是网上搜了下相关介绍，找到了一个比较融创理解的解释，记录如下：

BNF是John Backus 在20世纪90年代提出的用以简洁描述一种编程语言的语言。
基本结构为：<non-terminal> ::= <replacement>
non-terminal意为非终止符，就是说我们还没有定义完的东西，还可以继续由右边的replacement，也就是代替物来进一步解释、定义。
举个例子：在中文语法里，一个句子一般由“主语”、“谓语”和“宾语”组成，主语可以是名词或者代词，谓语一般是动词，宾语可以使形容词，名词或者代词。那么“主语”、“谓语”和“宾语”就是非终止符，因为还可以继续由“名词”、“代词”、“动词”、“形容词”等替代。
- 例1. <句子>::=<主语><谓语><宾语>
- 例2. <主语>::=<名词>|<代词>
- 例3. <谓语>::=<动词>
- 例4. <宾语>::=<形容词>|<名词>|<代词>
- 例5. <代词>::=<我>
- 例6. <动词>::=<吃>
- 例7. <动词>::=<喜欢>
- 例8. <名词>::=<车>
- 例9. <名词>::=<肉>

如上，在::=左边的就是non-terminal非终止符，右边的就是replacement，可以是一系列的非终止符，如例1中的replacement便是后面例234左边的非终止符，也可以是终止符，如例56789的右边，找不到别的符号来进一步代替。因此，终止符永远不会出现在左边。

一旦我们看到了终止符，这个描述过程就结束了。

带括号的运算使用 BNF 表示如下：
```xml
<MultiplicativeExpression>::=<Number>|
  <MultiplicativeExpression>"*"<Number>|
  <MultiplicativeExpression>"/"<Number>

<AddtiveExpression>::=<MultiplicativeExpression>|
  <AddtiveExpression>"+"<MultiplicativeExpression>|
  <AddtiveExpression>"-"<MultiplicativeExpression>

<PriorityExpression>::==<MultiplicativeExpression>|"("<AddtiveExpression>")"

<ArithmeticExpression>::==<PriorityExpression>"+"<PriorityExpression>|
  <PriorityExpression>"-"<PriorityExpression>|
  <PriorityExpression>"*"<PriorityExpression>|
  <PriorityExpression>"/"<PriorityExpression>
```

## 形式语言分类：
- 形式语言按用途分类：
  - 数据描述语言：JSON、HTML、XAML、SQL、CSS
  - 编程语言：C、C++、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskell、JavaScript
- 形式语言按表达方式分类：
  -声明式语言：JSON、HTML、XAML、SQL、CSS、Lisp、Clojure、Haskell
  - 命令式语言：C、C++、Java、C#、Python、Ruby、Perl、JavaScript

## 编程语言的几个性质：
### 1.图灵完备性
在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指 **具有无限存储能力的通用物理机器或编程语言**。

- 命令式 - 图灵机
  - goto
  - if 和 while
- 声明式 - lambda
  - 递归

**图灵机（Turing machine）**：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于 **任何有限逻辑数学过程的终极强大逻辑机器**。

### 2.静态语言和动态语言的区别
- 静态语言（强类型语言）
  - 静态语言是在编译时变量的数据类型即可确定的语言，多数静态类型语言要求在使用变量之前必须声明数据类型。 
  - 例如：C++、Java、Delphi、C#等。
  - 由于类型的强制声明，使得IDE有很强的代码感知能力，故，在实现复杂的业务逻辑、开发大型商业系统、以及那些生命周期很长的应用中，依托IDE对系统的开发很有保障；
  - 由于静态语言相对比较封闭，使得第三方开发包对代码的侵害性可以降到最低；
- 动态语言（弱类型语言）
  - 动态语言是在运行时确定数据类型的语言。变量使用之前不需要类型声明，通常变量的类型是被赋值的那个值的类型。 
  - 例如PHP、ASP、Ruby、Python、Perl、ABAP、SQL、JavaScript、Unix Shell等等。
  - 思维不受束缚，可以任意发挥，把更多的精力放在产品本身上；
  - 集中思考业务逻辑实现，思考过程即实现过程；

### 3.强弱类型语言
- 强类型定义语言
  - 强制数据类型定义的语言。也就是说，一旦一个变量被指定了某个数据类型，如果不经过强制转换，那么它就永远是这个数据类型了。
  - 举个例子：如果你定义了一个整型变量 a,那么程序根本不可能将 a 当作字符串类型处理。
  - 强类型定义语言是类型安全的语言。
  - 强类型语言是一旦变量的类型被确定，就不能转化的语言。 
- 弱类型定义语言
  - 数据类型可以被忽略的语言。
  - 它与强类型定义语言相反, 一个变量可以赋不同数据类型的值。
  - 强类型定义语言在速度上可能略逊色于弱类型定义语言，但是强类型定义语言带来的严谨性能够有效的避免许多错误。
  - 一个变量的类型是由其应用上下文确定的

## 一般命令式编程语言的设计方式
- Atom(原子)：identifier(标识符)、literal(字符直接量)
  - Grammar: 字符直接量、标识符、关键字、空白符、换行符
  - Runtime: 运行时改变
- Expression(表达式)：Atom、Operator、Punctuator(运算符)
- Statement(语句)：Expression、Keyword、Punctuator
- Structure(结构化)：Function、Class、Progress、Namespace
- Program：Program、Module、Package、Library

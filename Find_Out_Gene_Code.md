# Find Out Gene Code
## Language
Matlab
## Description
### System Analysis
#### Flow Chart
```flow
st=>start: Start
op1=>operation: Input Gene String
e1=>end: Print(gene)
e2=>end: Print("No gene is found")
cond1=>condition: isempty(str)
cond2=>condition: isempty(gene)

st->op1->cond1->cod2
cond1(yes)->op1
cond1(no)->cond2
cond2(yes)->e2
cond2(no)->e1
```
#### Parameter

| Name        | Meaning                        |
| --------    | --------                       |
| str         |字串，使用者輸入的染色體序列         |
| strStart    |數字陣列，序列ATG的開始位置         |
| strEnd      |數字陣列，序列TAA、TAG、TGA的開始位置|
| Gene        |字串陣列，基因序列的字串            |
| ATG         |字串，ATG                        |
| TAA         |字串，TAA                        |
| TAG         |字串，TAG                        |
| TGA         |字串，TGA                        |
| Condition   |數字，基因序列結果                 | 

### Result
#### Output Screenshot
![](https://i.imgur.com/B9XwGuP.png =400x150)

![](https://i.imgur.com/xaHg53O.png =300x80)

![](https://i.imgur.com/uzrd8Zf.png =300x80)

#### Result Arrangement


| Input| Output | 
| -------- | -------- |
| TTATGTTTTAAGGATGGGGCGTTAGTT    |{'TTT'}    {'GGGCGT'} |
| TGTGTGTATAT   | No gene is found  |
|TAATTTATG     | No gene is found    |
| ATGTAAAATGGGGTGA    | {0×0 char}    {'GGG'}    |



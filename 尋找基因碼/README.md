# Find Out Gene Code
###### tags: `TCprj`, `NTUE`
## Language
Matlab
## Description
### System Analysis
#### Flow Chart
![](https://i.imgur.com/IoeYlIw.png)
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
![](https://i.imgur.com/B9XwGuP.png)

![](https://i.imgur.com/xaHg53O.png)

![](https://i.imgur.com/uzrd8Zf.png)

#### Result Arrangement


| Input| Output | 
| -------- | -------- |
| TTATGTTTTAAGGATGGGGCGTTAGTT    |{'TTT'}    {'GGGCGT'} |
| TGTGTGTATAT   | No gene is found  |
|TAATTTATG     | No gene is found    |
| ATGTAAAATGGGGTGA    | {0×0 char}    {'GGG'}    |



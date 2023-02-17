# Implementation of Artificial Fish-Swarm Algoritm
###### tags: `TCprj`, `NTUE`
## Language
Matlab
## Description
### System Analysis
#### Topic
![](https://i.imgur.com/gCO3As8.png)
![](https://i.imgur.com/GqcRfQf.png)
* 試利用matlab程式，以人工魚群演算法求f之最小值

#### Flow Chart
![](https://i.imgur.com/CXvjl6l.png)

#### Encoding
1. X = 17bits
    1. X ∈ [-1.5, 4]
    2. 4 – (-1.5) = 5.5
    3. 0~5: 至少需要3bits表示 (2^2 < 5 < 2^3)
    4. 0.0000: 至少需要14bit表示 (2^(-14) = 0.00006…)
2. Y = 17bits
    1)	Y ∈ [-3, 3]
    2)	3 – (-3) = 6
    3)	0~6: 至少需要3bits表示 (2^2 < 6 < 2^3)
    4)	0.0000: 至少需要14bit表示 (2^(-14) = 0.00006…)
3.	Chromosome = 34bit3
    1)	X: 前17bits
    2)	Y: 後17bits

### Result
1. Answer
    1. X：
    2. Y：
    3. ｆ：
2. Graph of Function f
![]()
3. Convergent Process
 ![]()
4. Conclusion
    

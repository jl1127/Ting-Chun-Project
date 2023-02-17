# Implementation of Genetic Algorithm
###### tags: `TCprj`, `NTUE`
## Language
Matlab
## Description
### System Analysis
#### Topic
![](https://i.imgur.com/H4Fmvrp.png)

#### Flow Chart
![](https://i.imgur.com/avBHuwe.png)

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

#### Decide Population size
1. Population size = 150
1. 嘗試過50、100、150、200、250，其中150的收斂情形比較穩定

#### Define Evaluation Function
* 適應函數與題目相同: sin(X + Y) + (X - Y).^2 - 1.5*X + 2.5*Y + 1

#### Define the Mechanism of Selection, Crossover, Mutation
##### Selection
1)	採用輪盤法
2)	先產生一列隨機數，再從小排到大
3)	適應度越大所佔面積越大

##### Crossover
1. 單點法結果
 ![](https://i.imgur.com/Js9xi7Z.jpg)

3. 雙點法結果
![](https://i.imgur.com/MmXg7HC.jpg)

5. 雙點法+前50%當父代、後50%當子代
![](https://i.imgur.com/V1pAbld.png)

*最後選擇雙點法與「前50%當父代、後50%當子代」的混和方式當交配的機制*

##### Mutation
* 若隨機值<突變機率，則chromosome的0、1互換

#### Probability of Crossover and Mutation
1. 交配機率(Crossover probability)：0.6
2. 突變機率(Mutation probability)：0.02
3. 交配機率、突變機率對最佳值的影響

    | Crossover | Mutation | Value X | Value Y | Minimum |
    |:---------:|:--------:|:-------:|:-------:|:-------:|
    |0.6|   0.01|  -1.1749  |1.1331     |-1.8482|
    |**0.6**|	**0.02**|	**2.7695**	|**-2.6207**	|**-1.9096**|
    |0.6|	0.03|	3.5094	|-2.1768	|-1.8946|
    |0.7|	0.01|	3.1822	|-1.2246	|-1.8540|
    |0.7|	0.02|	3.4623	|-2.7547	|-1.8200|
    |0.7|	0.03|	1.4379	|0.28082	|-1.7477|
    |0.8|	0.01|	3.2881	|-2.2491	|-1.7979|
    |0.8|	0.02|	-0.52119|	1.9952	|-1.7491|
    |0.8|	0.03|	1.1439	|-0.9395	|-1.8536|

    * **表格紀錄值於迭代前期有明顯震盪、後期有明顯收斂**

#### Terminate Conditions
* iteration = 1000

### Result
1. Answer
    1. X：2.7695
    2. Y：-2.6207
    3. ｆ：-1.9096
2. Graph of Function f
![](https://i.imgur.com/qpldI68.jpg)
3. Convergent Process
 ![](https://i.imgur.com/Pq2Dxah.png)
4. Conclusion
    * 因為很多次跑出來的結果都是X = 3、Y = 4、-1.8 < f < -2，而且收斂的情況也不差，但機制應該還有不夠完善的地方，才會導致中期仍有明顯震盪。

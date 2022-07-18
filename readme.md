# SC599 - Performance evaluation of cross-platform mobile application frameworks - Test code bases

### The following folders contain the code bases used to evaluate the performance of camera and geolocation on React Native and Flutter.

##### SC599-FL - Flutter codebase
##### SC599-RN - React Native codebase

##### The following table contains the results of the evaluation:
```
Camera Open time (ms)		Capture Time (ms)	Location Retrieve (ms)
        RN	FL		RN	FL		RN	FL
        251	212		744	627		37	27
        279	386		709	887		36	28
        192	411		671	671		42	126
        247	368		723	574		119	28
        215	416		683	622		113	27
        243	391		714	570		33	2199
        217	359		721	587		35	87
        208	460		716	536		35	27
        187	358		708	703		178	108
        195	439		721	571		35	28
        243	413		677	575		35	101
        177	409		739	583		33	27
        230	404		725	567		124	807
        212	375		742	726		35	32
        197	422		725	789		39	40
        230	435		674	591		30	33
        198	363		661	568		117	114
        224	378		721	549		31	1099
        194	454		687	580		33	112
        191	324		674	553		35	27

Average	216.5	388.85	        706.75	621.45	 	58.75	253.85
```
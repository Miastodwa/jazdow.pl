<template lang='pug'>
#oj-map.oj-map
	.map-viewport
		svg#svg-map(
			xmlns='http://www.w3.org/2000/svg'
			xmlns:xlink='http://www.w3.org/1999/xlink'
			viewBox="0 0 1394 956")
			defs
				symbol#house(data-name='house-open', viewbox='0 0 56 41')
					polygon(points='32.25 32.05 32.25 39.85 0.25 23.25 0.25 15.35 6.95 18.85 32.25 32.05')
					polygon(points='43.55 16.95 42.15 18.85 35.05 28.25 32.25 32.05 6.95 18.85 0.25 15.35 11.45 0.25 18.25 3.75 43.55 16.95')
					polygon(points='54.85 17.55 43.55 16.95 18.25 3.75 11.45 0.25 22.75 0.85 54.85 17.55')
					polygon(points='54.85 17.55 54.85 25.45 43.55 32.65 32.25 39.85 32.25 32.05 35.05 28.25 42.15 18.85 43.55 16.95 54.85 17.55')
				symbol#zabytek(data-name='zabytek', viewbox='0 0 30.5 17.5')
					polygon.filled(points='0.1 0 0 8.8 15.3 8.8 15.3 0 0.1 0')
					polygon.filled(points='15.3 8.8 15.3 17.6 30.6 8.8 15.3 8.8')
					path.filled(d='M15.3,17L29.6,8.8,15.2,0.5H0.6v8L15.3,17m0,0.6L0,8.8V0H15.3L30.5,8.8,15.3,17.6h0Z')

			g#oj-map-land
				path.map-land-1(d='M760.7,69.3a5.81,5.81,0,0,0,1.9-1.6c54.1,25.4,146.7,69.1,229.3,108.5a98.32,98.32,0,0,0-28.8,13.4l-52.2,36.8a8.48,8.48,0,0,0-8.8.8l-231,163.1L425.6,262.9Z', transform='translate(0.26)')
				path.map-land-1(d='M714.6,75.4C697.4,69.1,627.7,43.7,584,28.1c-9.8-3.5-25.2-5.4-31.5-7.6L593.4,0S729.1,52.1,743.5,58.8Z', transform='translate(0.26)')
				polygon.map-land-1(points='771.76 341 953.56 433.3 949.16 435.9 863.36 489.7 689.06 399.4 771.76 341')
				path.map-land-1(d='M863.9,510.1l169.8,88L1143,661.3,972,750a6.55,6.55,0,0,0-1.8-1.5L927.9,722l-26-13.1L868,686.7,720.5,600.2Z', transform='translate(0.26)')
				path.map-land-1(d='M1033.1,577.9L881.3,499.2l76.6-48.1,9-5.2c15.7-9.1,30.3-8.8,47.1.9l118.2,68.4Z', transform='translate(0.26)')
				path.map-land-1(d='M1022.8,431.5c-16.9-9.8-33.1-12.3-49.2-7.7L787.8,329.5l124.5-87.9a8.87,8.87,0,0,0,3.7-6.8l52.8-37.2c9.8-6.9,22.8-11.9,37.2-14.7,56.3,26.8,106.5,50.9,134.6,64.8,2.5,11.3,13.3,61.5,13.2,78.2-0.1,14.6,15.2,27.2,32.8,41.8,19.1,15.8,40.7,33.6,40.6,54.2-0.1,14.6-45.8,56.2-79.4,83.2a20.67,20.67,0,0,0-5.8-4.8Z', transform='translate(0.26)')
				path.map-land-1(d='M535.1,29.6c11.2,0.8,26.9,2.3,35.9,5,12.5,3.6,97.8,34.7,132.5,47.3L407,253.2,270.7,182.5C373.2,123,466.9,68.7,535.1,29.6Z', transform='translate(0.26)')
				path.map-land-1(d='M20.5,328.3c77.2-45.1,156.7-91.4,232.1-135.2l149,77.2a8.32,8.32,0,0,0,3.1,1.6L654.4,401.4,408,560.4Z', transform='translate(0.26)')
				polygon.map-land-1(points='425.06 570.6 672.66 410.8 845.96 500.6 583.36 665.5 425.06 570.6')
				path.map-land-1(d='M600.1,675.7l103.4-64.9,154.9,90.8L892.6,724l26.2,13.2,35.2,22L840.5,818c-0.5.3-1,.5-1.5,0.8l-0.1-.1Z', transform='translate(0.26)')
				path.map-land-1(d='M936.7,903.3l-93-53.8c-5.5-3.2-8.5-7.1-8.4-11.1a8.08,8.08,0,0,1,.8-3.4c2.4-.5,6.8-6.1,7-7.1,0.6-.4,308.5-160,308.5-160l1.8-.9,0.3,0.1,6.2,46.2Z', transform='translate(0.26)')
				path.map-land-1(d='M1205.4,674.5l-36.7,31.2-5.7-42.1a1.61,1.61,0,0,0,.4-0.7,0.2,0.2,0,0,1,.1-0.2,120,120,0,0,1,16.4-4.3l36.6-8.5,12.6,3.8A276.59,276.59,0,0,1,1205.4,674.5Z', transform='translate(0.26)')
				path.map-land-1(d='M1330.8,451.7c-0.2-.6-13.8-53.8-18.3-65.3-4.2-10.5-17.4-27.2-32.3-40.8-14.5-13.2-91-71.4-116.8-86.4-1.8-1-5.7-3.1-11.5-6,4,18.6,11.8,57.5,11.7,72.6-0.1,10,14.2,21.8,29.2,34.2,20.7,17.1,44.3,36.6,44.1,61.9-0.1,22.8-62.4,74.4-85.6,92.8h0c0.1,5.7-3.1,11.1-8.8,14.7l-17.8,11.2-74.1,46.8,111.7,65.2,56-12.5,18.5,5.6a83.55,83.55,0,0,0,10.4-13.3c10.3-17.5,80.6-161,81.3-162.5A23.22,23.22,0,0,0,1330.8,451.7Z', transform='translate(0.26)')
				polygon.map-land-2(points='727.76 37.1 1163.36 247.9 1253.66 312.4 1314.46 362.5 1337.06 431.6 1341.46 462.9 1297.46 556.6 1242.06 668.9 912.16 942.5 1118.36 791.2 1268.56 678.6 1344.76 606.3 1393.86 525.7 1390.76 453.7 1382.36 372.5 1281.26 283.4 1101.36 183.2 1009.96 144.3 889.66 91.8 790.86 55.5 727.76 37.1')
			g#oj-map-borderss
				polygon.fence(points='667.56 94.8 420.16 238.1 306.96 177.8 546.26 40.3 667.56 94.8')
				polygon.fence(points='448.76 253.4 759.26 73.8 972.96 173.9 683.26 375.2 448.76 253.4')
				polygon.fence(points='669.96 427 826.96 505.2 708.76 578.6 678.46 575.7 577.66 519.4 562.46 494.9 669.96 427')
				polyline.fence(points='0.26 357.1 922.16 918.1 878.96 955.4')
				path.fence(d='M582.8,386.2L374.9,520.3,51.4,326.4,223.2,227c14.6-8.4,38-8.8,53.2-.9Z', transform='translate(0.26)')
			g#oj-map-buildings
				g#oj-map-building-embassy-fr
					g#oj-map-building-embassy-fr-1
						polygon.building(points='299.26 276.8 299.26 312.2 293.56 309 293.56 273.6 299.26 276.8')
						polygon.building(points='293.56 273.6 293.56 309 262.16 327.1 262.16 298.3 256.46 295 293.56 273.6')
						polygon.building(points='258.26 300.5 258.26 336 252.56 332.7 252.56 297.3 258.26 300.5')
						polygon.building(points='252.56 297.3 252.56 332.7 220.86 351 220.86 322.2 215.16 318.9 252.56 297.3')
						polygon.building(points='216.96 324.4 216.96 359.9 211.26 356.6 211.26 321.2 216.96 324.4')
						polygon.building(points='211.26 321.2 211.26 356.6 180.06 374.6 180.06 345.5 174.66 342.3 211.26 321.2')
						polygon.building(points='176.16 347.7 176.16 383.1 170.76 380 168.06 381.6 168.06 346.2 170.76 344.6 176.16 347.7')
						polygon.building(points='340.46 253 340.46 288.4 334.76 285.1 334.76 249.7 340.46 253')
						polygon.building(points='341.06 281.5 340.46 281.9 340.46 281.2 341.06 281.5')
						polygon.building(points='344.36 250.8 340.46 253 334.76 249.7 310.36 263.8 297.46 271.3 303.16 274.6 299.26 276.8 293.56 273.6 256.46 295 262.16 298.3 258.26 300.5 252.56 297.3 215.16 318.9 220.86 322.2 216.96 324.4 211.26 321.2 174.66 342.4 180.06 345.5 176.16 347.7 170.76 344.6 168.06 346.2 144.86 332.7 114.16 315 116.86 313.5 111.16 310.1 115.06 307.9 120.86 311.2 150.66 293.9 156.96 290.3 150.66 286.6 154.56 284.3 160.96 288 228.96 248.6 238.06 243.4 228.96 238.1 236.26 234 245.26 239.2 269.36 225.3 269.36 225.3 269.36 225.3 278.56 220 269.36 214.6 269.36 214.6 277.96 209.6 294.56 219.2 294.56 219.2 341.06 246.1 338.66 247.5 341.06 248.8 344.36 250.8')
						polygon.building(points='180.06 345.5 180.06 380.9 176.16 383.1 176.16 347.7 180.06 345.5')
						line.building(x1='216.96', y1='324.4', x2='216.96', y2='324.4')
						polygon.building(points='220.86 322.2 220.86 357.6 216.96 359.9 216.96 324.4 220.86 322.2')
						polygon.building(points='262.16 298.3 262.16 333.7 258.26 336 258.26 300.5 262.16 298.3')
						line.building(x1='293.56', y1='273.6', x2='293.56', y2='273.3')
						polygon.building(points='303.16 274.6 303.16 310 299.26 312.2 299.26 276.8 303.16 274.6')
						line.building(x1='299.26', y1='276.8', x2='299.26', y2='276.6')
						polygon.building(points='334.76 249.7 334.76 285.1 303.16 303.4 303.16 274.6 297.46 271.3 310.36 263.8 334.76 249.7')
						line.building(x1='303.16', y1='274.6', x2='303.16', y2='274.3')
						polygon.building(points='344.36 250.8 344.36 286.2 340.46 288.4 340.46 281.9 341.06 281.5 340.46 281.2 340.46 253 344.36 250.8')
						line.building(x1='341.06', y1='246.2', x2='341.06', y2='249.2')
						polygon.building(points='278.56 220 269.36 225.3 269.36 214.6 278.56 220')
						line.building(x1='269.36', y1='225.3', x2='269.36', y2='225.3')
						polygon.building(points='238.06 243.4 228.96 248.6 228.96 238.1 238.06 243.4')
						line.building(x1='228.96', y1='248.7', x2='228.96', y2='248.6')
						line.building(x1='150.66', y1='286.8', x2='150.66', y2='293.9')
						polygon.building(points='168.06 346.2 168.06 381.6 114.16 350.4 114.16 315 144.86 332.7 168.06 346.2')
						polygon.building(points='116.86 313.5 114.16 315 114.16 347.3 111.16 345.5 111.16 310.1 116.86 313.5')
					g#oj-map-building-embassy-fr-2
						polygon.building(points='415.36 412.1 415.36 441.6 385.36 424.3 385.36 394.8 415.36 412.1')
						polygon.building(points='444.86 395 444.86 424.5 415.36 441.6 415.36 412.1 444.86 395')
						polygon.building(points='439.46 386.3 434.66 389.1 440.46 392.5 444.86 395 415.36 412.1 385.36 394.8 391.36 391.3 390.86 391 381.76 385.8 375.76 389.2 355.46 377.5 384.96 360.4 388.86 362.7 394.66 359.4 398.56 357.1 394.66 354.8 414.46 343.3 434.76 355.1 410.16 369.4 419.76 374.9 434.76 366.2 444.46 360.6 474.36 378 449.66 392.2 439.46 386.3')
						polygon.building(points='375.76 389.2 375.76 418.7 355.46 407 355.46 377.5 375.76 389.2')
						polygon.building(points='381.76 385.8 381.76 415.3 375.76 418.7 375.76 389.2 381.76 385.8')
						polygon.building(points='391.36 391.3 385.36 394.8 385.36 417.4 381.76 415.3 381.76 385.8 390.86 391 391.36 391.3')
						polygon.building(points='449.66 392.2 449.66 421.7 444.86 418.9 444.86 395 440.46 392.5 434.66 389.1 439.46 386.3 449.66 392.2')
						polygon.building(points='474.36 378 474.36 407.5 449.66 421.7 449.66 392.2 474.36 378')
						polygon.building(points='434.76 355.1 434.76 366.2 419.76 374.9 410.16 369.4 434.76 355.1')
						polygon.building(points='398.56 357.1 394.66 359.4 394.66 354.8 398.56 357.1')
				g#oj-map-building-school
					polygon.building(points='597.36 97.1 597.36 130.5 421.96 232 421.96 198.6 431.36 193.1 568.46 113.8 597.36 97.1')
					polygon.building(points='421.96 198.6 421.96 232 398.26 218.3 398.26 184.9 421.96 198.6')
					polygon.building(points='573.76 83.4 567.76 86.9 567.76 79.9 570.46 81.5 573.76 83.4')
					polygon.building(points='593.26 85.8 585.56 90.2 597.36 97.1 568.46 113.8 431.36 193.1 421.96 198.6 398.26 184.9 402.56 182.4 395.66 178.4 387.26 173.6 382.96 176 362.46 164.2 456.16 110 476.66 121.8 421.26 153.9 429.76 158.7 436.56 162.7 463.06 147.4 476.66 139.5 552.46 95.7 567.76 86.9 573.76 83.4 570.46 81.5 567.76 79.9 575.46 75.5 549.16 60.3 586.66 38.7 630.66 64.2 601.76 80.9 593.26 85.8')
					polygon.building(points='630.66 64.2 630.66 97.6 597.36 116.8 597.36 97.1 585.56 90.2 593.26 85.8 601.76 80.9 630.66 64.2')
					polygon.building(points='402.56 182.4 398.26 184.9 398.26 213.4 387.26 207 387.26 173.6 395.66 178.4 402.56 182.4')
					polygon.building(points='387.26 173.6 387.26 207 382.96 209.5 382.96 176 387.26 173.6')
					polygon.building(points='382.96 176 382.96 209.5 362.46 197.6 362.46 164.2 382.96 176')
					polygon.building(points='476.66 121.8 476.66 139.5 463.06 147.4 436.56 162.7 429.76 158.7 421.26 153.9 476.66 121.8')
					polygon.building(points='575.46 75.5 567.76 79.9 567.76 86.9 552.46 95.7 549.16 93.8 549.16 60.3 575.46 75.5')
				g#oj-map-building-embassy-de
					polygon.building(points='753.36 156.5 753.36 190 676.86 234.2 647.96 217.5 732.56 168.5 753.36 156.5')
					polygon.building(points='684.96 294 684.96 327.4 626.86 293.8 626.86 260.4 684.96 294')
					polygon.building(points='621.26 232.9 647.86 248.2 626.86 260.4 626.86 269.5 621.26 266.3 594.86 281.6 594.86 248.2 621.26 232.9')
					polygon.building(points='732.56 168.5 647.96 217.4 676.96 234.2 722.46 260.5 725.56 270.5 703.76 283.1 684.96 294 626.86 260.4 647.86 248.2 621.26 232.9 594.86 248.2 573.56 235.8 552.56 223.7 573.16 211.8 573.26 211.8 573.26 211.7 581.06 207.2 573.26 202.6 573.16 202.6 593.66 190.8 601.56 195.4 722.96 125.2 753.36 156.5 732.56 168.5')
					polygon.building(points='594.86 248.2 594.86 281.6 552.56 257.1 552.56 223.7 573.56 235.8 594.86 248.2')
					polygon.building(points='725.56 270.5 725.56 304 684.96 327.4 684.96 294 703.76 283.1 725.56 270.5')
					line.building(x1='621.26', y1='232.9', x2='621.26', y2='266.3')
					polygon.building(points='581.06 207.2 573.26 211.7 573.26 202.6 581.06 207.2')
					line.building(x1='573.26', y1='211.8', x2='573.26', y2='211.7')
				g#oj-map-building-hospital
					polygon.building(points='775.76 486.9 775.76 512.5 772.46 514.5 753.06 526.8 749.76 528.9 749.76 503.3 753.06 501.3 753.76 500.8 772.46 488.9 775.76 486.9')
					polygon.building(points='661.26 452.9 661.26 478.4 657.96 480.5 657.96 454.9 661.26 452.9')
					polygon.building(points='682.26 464 666.76 473.7 666.76 481.4 661.26 478.4 661.26 452.9 682.26 464')
					polygon.building(points='695.16 488.7 695.16 514.2 666.76 499.3 666.76 473.7 695.16 488.7')
					polygon.building(points='749.76 503.3 749.76 528.9 724.76 515.8 724.76 490.2 749.76 503.3')
					polygon.building(points='710.56 478.9 710.56 504.5 695.16 514.2 695.16 488.7 708.06 480.5 710.56 478.9')
					polygon.building(points='775.76 486.9 772.46 488.9 753.76 500.8 753.06 501.3 749.76 503.3 724.76 490.2 725.56 489.7 728.06 488.1 722.86 485.4 713.96 480.7 710.56 478.9 708.06 480.5 695.16 488.7 666.76 473.7 682.26 464 661.26 452.9 657.96 454.9 655.06 453.4 633.06 441.8 659.06 425.3 683.96 438.5 680.66 440.5 683.96 442.2 711.46 456.8 716.36 453.7 725.16 458.3 720.36 461.4 725.16 464 747.56 475.8 750.76 473.7 775.76 486.9')
					polygon.building(points='728.06 488.1 725.56 489.7 724.76 490.2 724.76 512 710.56 504.5 710.56 478.9 713.96 480.7 722.86 485.4 728.06 488.1')
					polygon.building(points='657.96 454.9 657.96 480.5 633.06 467.3 633.06 441.8 655.06 453.4 657.96 454.9')
					line.building(x1='683.96', y1='438.5', x2='683.96', y2='442.2')
					polygon.building(points='725.16 458.3 725.16 464 720.36 461.4 725.16 458.3')
					line.building(x1='725.16', y1='464.1', x2='725.16', y2='464')
				g#oj-map-building-kinder
					polygon.building(points='1075.66 257.9 1071.36 260.7 1042.66 279.6 1031.26 287.2 980.06 320.9 969.46 327.9 931.36 353.1 927.06 355.9 901.86 343.2 906.06 340.3 898.86 336.7 910.36 329.1 917.56 332.8 963.96 302.2 972.96 296.2 963.96 291.7 974.56 284.7 983.56 289.2 1027.46 260.3 1027.46 260.2 1034.66 255.5 1027.46 251.8 1038.96 244.3 1046.16 247.9 1050.36 245.1 1075.66 257.9')
					polygon.building(points='906.16 340.3 901.86 343.2 901.86 371.6 898.86 370.1 898.86 336.7 906.16 340.3')
					polygon.building(points='927.06 355.9 927.06 389.4 901.86 376.6 901.86 343.2 927.06 355.9')
					polygon.building(points='1075.66 257.9 1075.66 291.3 1071.36 294.1 931.36 386.5 927.06 389.4 927.06 355.9 931.36 353.1 969.46 327.9 980.06 320.9 1031.26 287.2 1042.66 279.6 1071.36 260.7 1075.66 257.9')
					polygon.building(points='1034.66 255.5 1027.46 260.2 1027.46 251.8 1034.66 255.5')
					polygon.building(points='972.96 296.2 963.96 302.2 963.96 291.7 972.96 296.2')
				g#oj-map-building-mpro
					polygon.building(points='1106.16 407.5 1106.16 427.1 1101.26 429.9 1101.26 410.3 1106.16 407.5')
					polygon.building(points='1114.66 412.4 1114.66 432.1 1106.16 427.1 1106.16 407.5 1114.66 412.4')
					polygon.building(points='1177.66 375.9 1165.56 383 1114.66 412.4 1106.16 407.5 1101.26 410.3 1096.46 407.5 1087.36 402.2 1092.16 399.4 1084.36 394.8 1147.36 358.4 1155.16 362.9 1160.06 360.1 1174.06 368.2 1169.16 371 1174.06 373.8 1177.66 375.9')
					polygon.building(points='1092.16 399.4 1087.36 402.2 1087.36 416.2 1084.36 414.5 1084.36 394.8 1092.16 399.4')
					polygon.building(points='1101.26 410.3 1101.26 429.9 1087.36 421.9 1087.36 402.2 1096.46 407.5 1101.26 410.3')
					polygon.building(points='1177.66 375.9 1177.66 395.6 1114.66 432.1 1114.66 412.4 1165.56 383 1177.66 375.9')
					polygon.building(points='1174.06 368.2 1174.06 373.8 1169.16 371 1174.06 368.2')
					line.building(x1='1174.06', y1='374.1', x2='1174.06', y2='373.8')
			g#oj-map-streets
				text.street-label(transform='matrix(0.87, -0.5, 0.5, 0.87, 41.15, 308.02)') ul. Piękna
				text.street-label(transform='translate(435.7 282.35) rotate(28.11)') ul. Jazdów
				text.street-label(transform='matrix(0.86, 0.52, -0.52, 0.86, 404.62, 584.52)') ul. Johna Lennona
				text.street-label(transform='translate(350.99 639.22) rotate(30.95)') Park Ujazdowski
				text.street-label(transform='matrix(0.87, -0.5, 0.5, 0.87, 289.41, 162.89)') ul. Górnośląska
				text.street-label(transform='translate(1129.54 821.6) rotate(-38.97)') Trasa Łazienkowska
			g#oj-map-symbols
				use(width='30.6', height='17.6', transform='matrix(0.75, 0, 0, -0.75, 979.42, 305.64)', xlink:href='#zabytek')
				use(width='30.6', height='17.6', transform='matrix(0.75, 0, 0, -0.75, 688.02, 474.58)', xlink:href='#zabytek')
				use(width='30.6', height='17.6', transform='matrix(0.75, 0, 0, -0.75, 1121.05, 390.43)', xlink:href='#zabytek')
				g
					path.filled(d='M1137.7,413.3l-0.71.41v-6.94l0,0-2.8,8.51-0.66.38-2.8-5.29,0,0v6.94l-0.71.41V409.3l0.88-.5,3,5.68,0,0,3-9.11,0.88-.51v8.46Z', transform='translate(0.26)')
					path.filled(d='M1142.08,402.33c1.54-.88,2.58-0.43,2.58,1.15a5.05,5.05,0,0,1-2.59,4.13l-2.09,1.2V412l-0.76.44V404Zm-2.1,5.76,1.92-1.1a3.63,3.63,0,0,0,2-3.06c0-1.2-.74-1.49-2-0.78l-1.92,1.1v3.84Z', transform='translate(0.26)')
					path.filled(d='M1146.52,408.23l-0.76.44v-8.46l2.88-1.66c1.57-.9,2.58-0.52,2.58,1a4.61,4.61,0,0,1-1.73,3.38l1.95,2.47-0.89.51-1.85-2.4-0.12.07-2.06,1.18v3.46Zm0-4.17,2.06-1.18a3.36,3.36,0,0,0,1.85-2.85c0-1.12-.71-1.37-1.88-0.7l-2,1.17v3.57Z', transform='translate(0.26)')
					path.filled(d='M1159.46,396.57a7.46,7.46,0,0,1-3.66,6.46c-2.25,1.29-3.66.42-3.66-2.26a7.47,7.47,0,0,1,3.66-6.47C1158,393,1159.46,393.89,1159.46,396.57Zm-6.54,3.76c0,2.21,1.11,3,2.88,2a6.06,6.06,0,0,0,2.88-5.27c0-2.22-1.12-3-2.88-2A6.05,6.05,0,0,0,1152.92,400.33Z', transform='translate(0.26)')
					line.building(x1='281.46', y1='235.2', x2='281.46', y2='265.5')
					circle.building(cx='281.46', cy='232.9', r='3')
					polygon.building(points='297.26 239.2 297.26 235.6 281.46 239.9 281.46 249.2 287.86 247.5 287.86 251.1 303.66 246.9 303.66 237.5 297.26 239.2')
					line.building(x1='593.46', y1='203', x2='593.46', y2='233.3')
					circle.building(cx='593.46', cy='200.7', r='3')
					polygon.building(points='609.26 207 609.26 203.4 593.46 207.6 593.46 217 599.96 215.3 599.96 218.9 615.66 214.6 615.66 205.3 609.26 207')
					polygon.building(points='685.56 495.1 681.46 492.8 681.46 488.1 678.76 486.5 678.76 491.2 674.66 488.9 674.66 492 678.76 494.3 678.76 499 681.46 500.6 681.46 495.9 685.56 498.2 685.56 495.1')
					path.building(d='M1008.9,319.4c0,6.2-4.4,13.9-9.9,17s-9.9.6-9.9-5.6,4.4-13.9,9.9-17S1008.9,313.1,1008.9,319.4Z', transform='translate(0.26)')
					path.filled(d='M995.7,324.7a1.9,1.9,0,0,1-.8,1.5,0.43,0.43,0,0,1-.7-0.1,0.6,0.6,0,0,1-.1-0.4,1.9,1.9,0,0,1,.8-1.5,0.43,0.43,0,0,1,.7.1A2.27,2.27,0,0,1,995.7,324.7Z', transform='translate(0.26)')
					path.filled(d='M1004.2,319.8a1.9,1.9,0,0,1-.8,1.5,0.43,0.43,0,0,1-.7-0.1,0.6,0.6,0,0,1-.1-0.4,1.9,1.9,0,0,1,.8-1.5,0.43,0.43,0,0,1,.7.1A0.48,0.48,0,0,1,1004.2,319.8Z', transform='translate(0.26)')
					path.building(d='M993.2,329.9c0.6,2.7,3,3.7,5.8,2a12.84,12.84,0,0,0,5.8-8.7', transform='translate(0.26)')
					path.building(d='M522.6,151.3c0,5.6-2.6,14.4-8.3,21.9-5.7-.9-8.3-6.6-8.3-12.3v-6.2a4.87,4.87,0,0,0,3.3-.7,15.22,15.22,0,0,0,5-5.4,5,5,0,0,0,5-.3,12.19,12.19,0,0,0,3.3-3.1v6.1h0Z', transform='translate(0.26)')
					path.filled(d='M511.2,165.2v-6.6l-1.6,2.2v-1l1.6-2.3,0.8-.5v7.7Z', transform='translate(0.26)')
					path.filled(d='M514.5,163.3v-0.8l2.7-5.4a6.47,6.47,0,0,0,.4-1.3c0-.8-0.4-1-1.1-0.6a2.31,2.31,0,0,0-1.1,2l-0.8.5a4,4,0,0,1,2-3.4,1.36,1.36,0,0,1,1.6-.1,1.69,1.69,0,0,1,.3,1,3.61,3.61,0,0,1-.6,2l-2.3,4.5,2.9-1.7v0.9Z', transform='translate(0.26)')

			g#oj-map-houses-open(ref="open")
				use(
					v-for="house in openHouses",
					xlink:href="#house",
					class="house open",
					@click="$router.push($localePath + dir[$lang] + house.address.replace('/','-') + '/')",
					@mouseenter="updateLabel(house.name, 'enter')",
					@mouseout="updateLabel(house.name, 'leave')",
					:id="house.address.replace('/','-')",
					:width="house.width",
					:height="house.height",
					:name="house.name",
					:transform="'translate(' + house.coords + ')'")
			g#oj-map-houses-closed(ref="closed")
				use(
					v-for="house in closedHouses",
					xlink:href="#house",
					class="house closed",
					:id="house.address.replace('/','-')",
					:width="house.width",
					:height="house.height",
					:name="labels.closed[lang]",
					:transform="'translate(' + house.coords + ')'")
			g#oj-map-numbers(ref="numbers")
				text(
					v-for="house in openHouses"
					class="house-number",
					:transform="numTransform(house.coords)") {{house.address}}
				text(
					v-for="house in closedHouses"
					class="house-number",
					:transform="numTransform(house.coords)") {{house.address}}

	#house-label(:class="[currentLabel.animate, {fixed: currentLabel.isFixed}]")
		#house-label-content {{currentLabel.text}}
</template>

<script>

 export default {
	name: 'oj-map',
	props: {
		lang: String,
		openHouses: Array,
		closedHouses: Array,
	},

	data() {
		return {
			labels: {
				closed: {
					pl: 'Domek zamieszkały',
					en: 'Inhabitted house'
				}
			},
			currentLabel: {
				text: '',
				animate: '',
				isFixed: true
			},
			dir: {
				'en-US': 'houses/',
				'pl-PL': 'domki/'
			}
		}
	},

	methods: {
		goToHouse(id){
			const route = this.$localePath + this.dir[this.$lang] + id
			this.$router.push(route)
		},

		distFromTop(elem) {
			let location = 0
			if (elem.offsetParent) {
				while (true) {
					location += elem.offsetTop
					elem = elem.offsetParent
					if (!elem) {
						break
					}
				}
			}
			if (location >= 0) { return location } else { return 0 }
		},

		numTransform(coordsPair){
			const coords = coordsPair.split(' ')
			const newCoords = `${parseFloat(coords[0]) + 6.5} ${parseFloat(coords[1]) + 12.5}`
			return `translate(${newCoords}) rotate(27.5)`
		},

		updateLabel(name, type){
			this.currentLabel.text = name
			return this.currentLabel.animate = type
		}
	}
}

</script>

<style scoped lang='stylus'>
@import '../styles/component'
$oj-map-dark = $oj-violet

#oj-map
	display block
	position relative
	clearfix()
	margin-top 12rem
	overflow-x hidden
	width 100%
.map-viewport
	display block
	width 100%
	+below(600px, true)
		width 170%
		transform translateX(-25%)
.map-land-1
	fill $oj-palegreen
.map-land-2
	fill $oj-palegreen2
.building
	fill #fff
	stroke-miterlimit 10
	stroke-width 0.5px
	stroke $oj-map-dark
.fence
	stroke $oj-map-dark
	fill none
	opacity 0.75
	stroke-miterlimit 10
	stroke-dasharray 2 5
.street-label
	font-size 14px
	color $oj-map-dark
.filled
	fill $oj-map-dark
#house-label
	position fixed
	display block
	left 0
	right 0
	z-index 9
	margin 0 auto
	padding .5rem 0
	bottom 0
	background-color rgba(white, .9)
	&.enter
		animation labelIn .2s 1 ease
		visibility visible
	&.leave
		animation labelOut .5s 1 ease
		visibility hidden
#house-label-content
	color $oj-violet
	font-family $P
	font-weight 700
	font-size 1.2rem
	line-height 1.4em
	letter-spacing .05em
	text-align center
	max-width 520px
	margin 0 auto
	padding 0 1rem
svg
	.house
		stroke #5200cc
		stroke-linejoin bevel
		stroke-width 0.5px
		&.open
			cursor pointer
			fill #f7e98b
			&:hover
				fill #ffe954
		&.closed
			fill white

	.house-number, text
		fill #5200cc
		font-family SC, Monaco, monospace
		font-size 13px
		font-weight 300
		isolation isolate
		pointer-events none
		cursor pointer

</style>

<h1> Problem Statement </h1>
Jane has a container which allows water to flow in and out of it based on the available space inside it. The container can be viewed as a 2D grid.

So, the container has multiple columns and rows. Water always flows downwards. For example, in the above grid if water enters the container in the third column, it flows downwards and exits out of the same column.
Before pouring water inside the container, Jane adds various blocks inside the container at random cells. Sample container with blocks is represented below. Note that the blocks are represented in black color.

If water is poured into the container with the blocks, it diverts in left and right columns if possible whenever water hits a block. From then on, it continues to flow in both directions. For example, in the above grid if water is poured into the third column, then it comes out via the first, third and fifth columns.Jane wants to build containers of various sizes and add a varying number of blocks in each of them. She is in need of an easier way of checking how water will flow inside them for different combinations.

The goal is to build a simulator for Jane. The simulator should be a web application which will allow her to configure the container size (in terms of rows and columns) and the number of blocks, and show a simulation of the water flow inside the container grid

<img src='https://media.giphy.com/media/cFU6r8iC2BJNGCum5Z/giphy.gif' width='50' height='50'/>
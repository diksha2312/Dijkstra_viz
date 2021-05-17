#Dijkstra algorithm dynamic demonstration

**2018-11-24 update**

It took a morning to write the js version and was able to demonstrate the process dynamically

Demo address: https://me.idealli.com/others/Dijkstra.html

![Lanzhou Little Red Chicken](https://picture-1256429518.cos.ap-chengdu.myqcloud.com/blog/112402.png)

First look at the description of the algorithm

**Problem Description**

Given a weighted directed graph G=(V,E), the weight of each edge is a non-negative real number. In addition, a vertex in V is also given, which is called the source. Now we want to calculate the shortest path length from the source to all other vertices. The length here refers to the sum of the weights on each side of the road. This problem is usually called the single-source shortest path problem.
Dijkstra's algorithm solution

Dijkstra proposed an algorithm to generate the shortest path to each vertex in the increasing order of the path length between each vertex and the source point v. First find the shortest path with the shortest length, and then use it to find the shortest path with the second shortest length, and so on, until all the shortest paths from the source point v to the other vertices are found.

**The problem-solving thought of Dijkstra algorithm**

Divide all the vertices V in the graph G into two vertex sets S and T. Taking v as the source point, the end point of the shortest path has been determined and merged into the S set. S initially contains only the vertex v, and T is the set of vertices that has not yet determined the shortest path to the source point v. Then select the point with the shortest path from the set point S to the set T each time from the set T, add it to the set S, and delete this point from the set T. Until the T set is empty.

**Specific steps**

1. Choose a vertex v as the source point, and regard all edges starting from the source point v as the shortest path to each vertex (determine the data structure: because the shortest path is sought, ①a record from the source point v The path length array dist[] to other vertices. At the beginning, dist is the direct edge length from the source point v to the vertex i, that is, the record in dist is the v-th row of the adjacency matrix. ②Set one to record from the source point The path array path[] to other vertices, path stores the predecessor vertex of the i-th vertex on the path).

2. Select the shortest path from the above shortest path dist[], and add its end point (ie v, k) k to the set s.

3. Adjust the shortest path from each vertex in T to the source point v. Because when vertex k is added to the set s, the path from the source point v to the remaining vertices j in T increases through the vertex k to j. This path may be shorter than the original source point v to j. To be short. The adjustment method is to compare dist[k]+g[k,j] and dist[j], whichever is smaller.

4. Then select a vertex k with the smallest path length to the source point v, delete it from T and add it to S, then go back to the third step, and repeat until the set S contains all the vertices of the graph G.

<a href="https://me.idealli.com/post/651cfd47.html"><img src="https://image.idealli.com/blog/18123106.jpg"></a>

<a href="https://www.vultr.com/?ref=7446652"><img src="https://www.vultr.com/media/banner_1.png" width="728" height="90"></a>

**Part of the javascript code**

```java

var MaxvertextType = 100
var gigantic = 99999

//Adjacency matrix
function Mgraph() {
    this.vex=new Array();
    this.edge=new Array();
    this.vexnum=MaxvertextType;
    this.arcnum=MaxvertextType;
};

function getVex(G,x){
    var i=0;
    for(;G.vex[i]!=x;i++);
    return i;
}


//Single source shortest path algorithm
function Dijkstra(g,x){
    var vexnum=g.vexnum;
    var vex=getVex(g,x);
    var dist = new Array();
    var path = new Array();
    path[0]=0;
    for (var i = 0; i <vexnum; ++i) {
        dist[i]=g.edge[vex][i];
        if(dist[i]!=gigantic)path[i]=0;
    }
    var S = new Array();
    S[0] = true;
    var dd;
    var dvex=0;
    for (var j = 0; j <vexnum-1; ++j) {
        dd=gigantic;
        for (var i = 1; i <vexnum; ++i) {
            if(dist[i]<dd && !S[i]) {
                dd=dist[i];
                dvex=i;
            }
        }
        S[dvex]= true;
        for (var k = 1; k <vexnum; ++k) {
            if (!S[k]){
                if (dist[dvex]+g.edge[dvex][k]<dist[k]) {
                    dist[k] = dist[dvex] + g.edge[dvex][k];
                    path[k] = dvex;
                }
            }
        }
    }
    for (var m = 1; m <vexnum; ++m) {
        var nowvex=m;
        var str="\npath:"+g.vex[nowvex];
        while(path[nowvex]!=0){
            nowvex=path[nowvex];
            str=str+"<-"+g.vex[nowvex];
        }
        str=str+"<-"+g.vex[0]+"\tdistance:"+dist[m];
        console.log(str);
    }
}


//Initialization of the graph
function init(g){
    for(var i=0;i<g.vexnum;i++){
        var temp=[];
        for (var j = 0; j <g.vexnum; ++j) {
            if (i==j) temp[j]=0;
            else temp[j]=gigantic;
        }
        g.edge[i]=temp;
    }
}

```

I feel that the code is still a bit bloated

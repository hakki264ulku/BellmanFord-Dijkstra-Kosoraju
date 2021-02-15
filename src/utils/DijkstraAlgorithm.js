class Graphh {
    constructor(v) {
        this.V = v
        this.graph = []
    }

    addEdge(u, v, w) {
        this.graph.push([u, v, w])
    }

    findTheVertexIDs() {
        let arr = []
        for (const v of this.graph) {
            if(!arr.includes(v[0])) {
                arr.push(v[0])
            }
            if(!arr.includes(v[1])) {
                arr.push(v[1])
            }
        }
        return arr
    }

    minDistance(dist, ShortestPathSet) {
        let min = Number.MAX_SAFE_INTEGER
        let minVertex = -1
        
        let vertices = this.findTheVertexIDs()

        for (const v of vertices) {
            if (ShortestPathSet[v] == false && dist[v] <= min) {
                min = dist[v]
                minVertex = v
            }
        }
        return minVertex
    }

    printSolution(dist) {
        let result = {}

        let vertices = this.findTheVertexIDs()
        for (let v of vertices) {
            result[v] = dist[v]
            console.log(`${v} \t\t ${dist[v]}`)
        }
        return result
    }

    distanceFromUToV(u, v) {
        // graph contains values like [[s,t,w],[s1,t1,w1],[s2,t2,w2]]
        for (const g of this.graph) {
            if(g[0] === u && g[1]===v) return g[2]
        }
    }

    // returns the 
    dijkstra(src) {
        let currentDist = {}
        let ShortestPathSet = {} // keeps info whether the vertex is visited or not
        let vertices = this.findTheVertexIDs()


        for (let v of vertices) {
            currentDist[v] = Number.MAX_SAFE_INTEGER
            ShortestPathSet[v] = false
        }

        // current distance from source to source is 0
        currentDist[src] = 0

        // Find shortest path for all vertices, one less than the amount of vertices -> I think it's bcs of source is already known
        for (let c = 0; c < this.V; c++) {
            
            let minimum = this.minDistance(currentDist, ShortestPathSet) // minimum is the minVertex among the neighbours
            
            // set visited node as true
            ShortestPathSet[minimum] = true;
          
            for (const v of vertices) {
                let distUtoV = this.distanceFromUToV(minimum,v)

                // currentDist[v] is the known distance, !ShortestPathSet[v] -> v is not yet in the shortest path
                if (!ShortestPathSet[v] && distUtoV != 0 && currentDist[minimum] != Number.MAX_SAFE_INTEGER && currentDist[minimum] + distUtoV < currentDist[v]) {
                    currentDist[v] = currentDist[minimum] + distUtoV;
                }
            }
        }
        let result = this.printSolution(currentDist)
        return result
    }
}

export {
    Graphh
}


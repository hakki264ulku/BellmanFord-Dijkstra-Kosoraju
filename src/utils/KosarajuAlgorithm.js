const Stack = require('stack-lifo');

class Graphh {
    constructor(vertices) {
        this.V = vertices // amount of vertices in the graph
        this.graph = {} // it is an object and includes keys and values which are arrays
        this.visulizerGraph = []
    }

    doesLinksIncludeSourceTargetRelation(links=[], source, target) {
        if(links.length !== 0) {
            for(let i=0; i<links.length; i++) {
                if(links[0].source === source && links[0].target === target) {
                    return true
                }
            }
        }
        return false
    }

    // adds node to the graph
    addNode(u, v) {
        if (!this.graph[u]) {
            this.graph[u] = []
        }
        this.graph[u].push(v)

        if(!this.doesLinksIncludeSourceTargetRelation(this.visulizerGraph, u,v)) {
            this.visulizerGraph.push([u, v])
        }

    }

    // v-> vertex, visited-> object of true, false values for keeping track of visited nodes as keys
    // DEPTH FIRST SEARCH ALGORITHM
    DFS(v, visited, resultArray) {

        visited[v] = true
        console.log(`${v} `)
        resultArray.push(v)


        for (const i of this.graph[v]) {
            if (visited[i] === false) {
                this.DFS(i, visited, resultArray)
            }
        }
    }

    // recursive function for filling
    recursiveFiller(vertex, visited, stack) {
        visited[vertex] = true

        // if not initialized
        if (!this.graph[vertex]) {
            this.graph[vertex] = []
        }

        for (const i of this.graph[vertex]) {
            if (visited[i] == false) {
                this.recursiveFiller(i, visited, stack)
            }
        }

        stack.push(vertex)
    }

    getReverse() {
        let newGraph = new Graphh(this.V)

        for (const i of Object.keys(this.graph)) {
            for (const j of this.graph[i]) {
                newGraph.addNode(parseInt(j), parseInt(i))
            }
        }
        return newGraph
    }

    findTheVertexIDs() {
        let arr = []
        for (const v of Object.keys(this.graph)) {
            for (const j of this.graph[v]) {
                if (!arr.includes(parseInt(j))) {
                    arr.push(parseInt(j))
                }
            }
        }
        return arr
    }

    SCCs() {
        let stack = new Stack()
        let vertices = this.findTheVertexIDs()

        let visited = {}

        for (let v of vertices) {
            visited[v] = false
        }

        for (let v of vertices) {
            if (visited[v] == false) {
                this.recursiveFiller(v, visited, stack)
            }
        }

        let reversedGraph = this.getReverse()

        for (let v of vertices) {
            visited[v] = false
        }

        // while it's not empty
        let sccArray = []
        while (stack.isEmpty() == false) {
            let v = stack.pop()

            if (visited[v] == false) {
                let r = []
                reversedGraph.DFS(v, visited, r)
                sccArray.push(r)
                console.log()
            }
        }
        return sccArray
    }
}

function doesNodesIncludeID(nodes, id) {
    if(nodes.length !== 0){
       for(let i=0; i<nodes.length; i++) {
           if(nodes[i].id == id) return true
       }
    }
    return false
}

function doesLinksIncludeSourceTargetRelation(links, source, target) {
    if(links.length !== 0) {
        for(let i=0; i<links.length; i++) {
            if(links[i].source === source && links[i].target === target) {
                return true
            }
        }
    }
    return false
}

function produceGraphVisualisation(visualizerGraph) {
    let nodes = [], links = []

    for (const relation of visualizerGraph) {
        if (!doesNodesIncludeID(nodes, relation[0]+"")) {
            nodes.push({ id: relation[0]+"" })
        }

        if (!doesNodesIncludeID(nodes, relation[1]+"")) {
            nodes.push({ id: relation[1]+"" })
        }

        if(!doesLinksIncludeSourceTargetRelation(links, relation[0]+"", relation[1]+"")) {
            links.push({source:relation[0]+"", target:relation[1]+""})
        }
    }
    return [nodes, links]
}

export {
    Graphh,
    produceGraphVisualisation
}
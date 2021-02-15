class Graphh {
    constructor(vertices) {
        this.V = vertices // amount of nodes in the graph
        this.graph = []
    }

    addNode(u, v, w) {
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

    BellmanFord(sourceVertex) {
        let vertices = this.findTheVertexIDs()
        let objectOfDistances = {}

        for (const vertex of vertices) {
            objectOfDistances[vertex] = Number.MAX_SAFE_INTEGER
        }


        objectOfDistances[sourceVertex] = 0

        for (let i = 1; i < this.V; ++i) {
            for (const item of this.graph) {
                let u = item[0], v = item[1], w = item[2]
                if (objectOfDistances[u] != Number.MAX_SAFE_INTEGER && objectOfDistances[u] + w < objectOfDistances[v]) {
                    objectOfDistances[v] = objectOfDistances[u] + w
                }
            }
        }


        for (let i = 1; i < this.V; ++i) {
            for (const item of this.graph) {
                let u = item[0], v = item[1], w = item[2]

                if (objectOfDistances[u] != Number.MAX_SAFE_INTEGER && objectOfDistances[u] + w < objectOfDistances[v]) {
                    return
                }

            }
        }

        return objectOfDistances
    }
}

// doesNodesIncludeID -> returns ture if nodes array includes the given id node
function doesNodesIncludeID(nodes, id) {
    if(nodes.length !== 0){
       for(let i=0; i<nodes.length; i++) {
           if(nodes[i].id == id) return true
       }
    }
    return false
}

// doesLinksIncludeSourceTargetRelation -> returns true if links have the relation
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

// produceGraphVisualisation -> returns [nodes, links]
function produceGraphVisualisation(graph) {
    let nodes = [], links = []

    for (const relation of graph) {
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
import { IDX, EDGE } from '../constants.js';

export class Edge {

    constructor () {

        this.type = EDGE;
        this.id = IDX.get('edge');

        this.fromConstraintSegments = [];
        this.isConstrained = false;
        this.isReal = false;
        this.originVertex = null;
        this.oppositeEdge = null;
        this.nextLeftEdge = null;
        this.leftFace = null;

    }

    get destinationVertex () {
        if( !this.oppositeEdge ) return null
        return this.oppositeEdge.originVertex
    }

    get nextRightEdge () {
        if( !this.oppositeEdge ) return null
        if( !this.oppositeEdge.nextLeftEdge ) return null
        if( !this.oppositeEdge.nextLeftEdge.nextLeftEdge ) return null
        return this.oppositeEdge.nextLeftEdge.nextLeftEdge.oppositeEdge
    }

    get prevRightEdge () {
        if( !this.oppositeEdge ) return null
        if( !this.oppositeEdge.nextLeftEdge ) return null
        return this.oppositeEdge.nextLeftEdge.oppositeEdge
    }

    get prevLeftEdge () {
        if( !this.nextLeftEdge ) return null
        return this.nextLeftEdge.nextLeftEdge
    }

    get rotLeftEdge () {
        if(!this.nextLeftEdge) return null
        if(!this.nextLeftEdge.nextLeftEdge) return null
        return this.nextLeftEdge.nextLeftEdge.oppositeEdge
    }

    get rotRightEdge () {
        if( !this.oppositeEdge ) return null
        return this.oppositeEdge.nextLeftEdge
    }

    get rightFace () {
        if( !this.oppositeEdge ) return null
        return this.oppositeEdge.leftFace
    }

    setDatas( originVertex, oppositeEdge, nextLeftEdge, leftFace, isReal, isConstrained ) {

        this.isConstrained = isReal !== undefined ? isConstrained : false;
        this.isReal = isReal !== undefined ? isReal : true;
        this.originVertex = originVertex;
        this.oppositeEdge = oppositeEdge;
        this.nextLeftEdge = nextLeftEdge;
        this.leftFace = leftFace;

    }

    getDatas () {

        return [ this.originVertex.pos.x, this.originVertex.pos.y, this.destinationVertex.pos.x, this.destinationVertex.pos.y, this.isConstrained ? 1:0 ];

    }

    addFromConstraintSegment ( segment ) {


        //if( !segment ) return

        if ( this.fromConstraintSegments.indexOf(segment) === -1 ) this.fromConstraintSegments.push(segment);

    }

    removeFromConstraintSegment( segment ) {

        const index = this.fromConstraintSegments.indexOf( segment );
        if ( index !== -1 ) this.fromConstraintSegments.splice(index, 1);

    }

    dispose () {

        this.originVertex = null;
        this.oppositeEdge = null;
        this.nextLeftEdge = null;
        this.leftFace = null;
        this.fromConstraintSegments = null;

    }

    toString () {

        return "edge " + this.originVertex.id + " - " + this.destinationVertex.id;

    }

}
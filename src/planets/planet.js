import * as GL from 'three';

export default class Planet {
    constructor(name, mass, radius, rotVel, parent=undefined, texturePath=undefined) {
        this.textureRenderer = new GL.TextureLoader();
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.rotVel = rotVel;
        this.parent = parent;
        this.texturePath = texturePath
        this.geometry = new GL.SphereGeometry(this.radius, 32, 32);
        if(this.texturePath) {
            this.texture = new GL.MeshBasicMaterial({map: this.textureRenderer.load(this.texturePath)});
        }
        else {
            //get from default texture values
        }
        this.mesh = new GL.Mesh(this.geometry, this.texture);
    }

    rot() {
        this.mesh.rotateY(this.rotVel);
    }

}
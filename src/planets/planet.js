import * as GL from 'https://cdn.skypack.dev/three@0.135.0';

export default class Planet {
    constructor(name, mass, radius, rotVel, orbVel, parent=undefined, texturePath=undefined, rings=[undefined, undefined], description, link) {
        this.textureRenderer = new GL.TextureLoader();
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.rotVel = rotVel;
        this.orbVel = orbVel;
        this.parent = parent;
        this.texturePath = texturePath;
        this.geometry = new GL.SphereGeometry(this.radius, 32, 32);
        if(this.texturePath) {
            this.texture = new GL.MeshBasicMaterial({map: this.textureRenderer.load(this.texturePath)});
        }
        else {
            //get from default texture values
        }
        this.ringRadiusi = rings[0];
        this.ringRadiuso = rings[1];
        this.hasRings = !!this.ringRadiusi;
        this.ringMesh = undefined;
        this.mesh = new GL.Mesh(this.geometry, this.texture);
        this.model = undefined;
        this.description = description;
        this.link = link;
    }

    rot(modifier) {
        this.mesh.rotateY(this.rotVel*modifier);
    }

    orbit(modifier) {
        this.model.rotateY(this.orbVel*modifier);
    }

}
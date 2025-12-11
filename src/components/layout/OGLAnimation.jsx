import { Camera, Renderer, Transform, Plane, Texture, Program, Mesh } from "ogl";

export default class OGLAnimation {
  constructor(container, { items, bend = 1, scrollSpeed = 1, scrollEase = 0.05 }) {
  this.container = container;

  this.scroll = { current: 0, target: 0, last: 0, ease: scrollEase };
  this.autoSpeed = scrollSpeed * 0.03;

  this.createRenderer();
  this.createCamera();
  this.createScene();

  this.createGeometry();
  this.createItems(items, bend);

  this.resize();   // <-- FIXED: call after items

  this.addListeners();
  this.update();
}

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl, { fov: 45 });
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.plane = new Plane(this.gl, { widthSegments: 30, heightSegments: 30 });
  }

  createItems(items, bend) {
    const doubled = [...items, ...items];
    this.items = doubled.map((item, index) =>
      new Media({
        gl: this.gl,
        scene: this.scene,
        geometry: this.plane,
        image: item.image,
        text: item.text,
        index,
        length: doubled.length,
        bend
      })
    );
  }

  addListeners() {
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;

    this.renderer.setSize(this.width, this.height);

    const fov = (this.camera.fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const viewWidth = (viewHeight * this.width) / this.height;

    this.viewport = { width: viewWidth, height: viewHeight };

    this.items?.forEach(item => item.resize(this.viewport));
  }

  autoScroll() {
    this.scroll.target += this.autoSpeed;
  }

  update = () => {
    this.autoScroll();

    this.scroll.current += (this.scroll.target - this.scroll.current) * this.scroll.ease;

    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    this.items.forEach(item => item.update(this.scroll, direction));

    this.renderer.render({ scene: this.scene, camera: this.camera });

    this.scroll.last = this.scroll.current;
    requestAnimationFrame(this.update);
  };

  destroy() {
    this.container.innerHTML = "";
  }
}

class Media {
  constructor({ gl, scene, geometry, image, text, index, length, bend }) {
    this.gl = gl;
    this.scene = scene;
    this.geometry = geometry;
    this.image = image;
    this.text = text;
    this.index = index;
    this.length = length;
    this.bend = bend;

    this.createTexture();
    this.createProgram();
    this.createMesh();
  }

  createTexture() {
    this.texture = new Texture(this.gl);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => (this.texture.image = img);
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix, projectionMatrix;
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 c = texture2D(tMap, vUv);
          if (c.a < 0.1) discard;
          gl_FragColor = c;
        }
      `,
      uniforms: { tMap: { value: this.texture } },
      transparent: true
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.mesh.setParent(this.scene);
  }

  resize(view) {
    this.view = view;

    this.mesh.scale.x = view.width * 0.13;
    this.mesh.scale.y = view.height * 0.70;

    this.width = this.mesh.scale.x + 0.55;
    this.totalWidth = this.width * this.length;

    this.x = this.width * this.index;
  }

  update(scroll, direction) {
    this.mesh.position.x = this.x - scroll.current;

    // bend curve
    const half = this.view.width / 2;
    const posX = this.mesh.position.x;
    const d = Math.min(Math.abs(posX), half);

    const R = (half * half + 1) / (2 * 1);
    const arc = R - Math.sqrt(R * R - d * d);

    this.mesh.position.y = -arc * this.bend * 1.8;

    // infinite loop
    if (direction === "right" && posX < -half) this.x += this.totalWidth;
    if (direction === "left" && posX > half) this.x -= this.totalWidth;
  }
}

import * as THREE from "three";
import Application from "../Application";
import { typo } from "./mesh/typo.js";
import { param } from "../param.js";
import gsap from "gsap";

export default class TypoHello {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;

    this.helloTypo = typo("Hello! I am");
    this.helloTypo.mesh.geometry.translate(
      0,
      -this.helloTypo.mesh.geometry.boundingBox.max.y * 0.5,
      0
    );
    this.descKO = new THREE.Group();
    this.descEN = new THREE.Group();
    this.hello = new THREE.Group();
    this.hello.add(this.helloTypo.mesh);
    this.scene.add(this.descEN, this.descKO, this.hello);
    this.descEN.visible = false;

    this.helloTypo.mesh.position.y = param.outerRadius * 3 + param.space * 2;
    this.descKO.position.y = -param.outerRadius * 4 - param.space * 2;
    this.descEN.position.copy(this.descKO.position);

    // KO description
    this.fromF = typo("f");
    this.fromR = typo("r");
    this.fromO = typo("o");
    this.fromM = typo("m");
    this.descKO.add(
      this.fromF.mesh,
      this.fromR.mesh,
      this.fromO.mesh,
      this.fromM.mesh
    );

    this.southS = typo("S");
    this.southO = typo("o");
    this.southU = typo("u");
    this.southT = typo("t");
    this.southH = typo("h");
    this.descKO.add(
      this.southS.mesh,
      this.southO.mesh,
      this.southU.mesh,
      this.southT.mesh,
      this.southH.mesh
    );

    this.koreaK = typo("K");
    this.koreaO = typo("o");
    this.koreaR = typo("r");
    this.koreaE = typo("e");
    this.koreaA = typo("a");
    this.descKO.add(
      this.koreaK.mesh,
      this.koreaO.mesh,
      this.koreaR.mesh,
      this.koreaE.mesh,
      this.koreaA.mesh
    );

    // EN description

    this.crtvC = typo("c");
    this.crtvR = typo("r");
    this.crtvE = typo("e");
    this.crtvA = typo("a");
    this.crtvT = typo("t");
    this.crtvI = typo("i");
    this.crtvV = typo("v");
    this.crtvE2 = typo("e");
    this.descEN.add(
      this.crtvC.mesh,
      this.crtvR.mesh,
      this.crtvE.mesh,
      this.crtvA.mesh,
      this.crtvT.mesh,
      this.crtvI.mesh,
      this.crtvV.mesh,
      this.crtvE2.mesh
    );

    this.devD = typo("d");
    this.devE = typo("e");
    this.devV = typo("v");
    this.devE2 = typo("e");
    this.devL = typo("l");
    this.devO = typo("o");
    this.devP = typo("p");
    this.devE3 = typo("e");
    this.devR = typo("r");
    this.descEN.add(
      this.devD.mesh,
      this.devE.mesh,
      this.devV.mesh,
      this.devE2.mesh,
      this.devL.mesh,
      this.devO.mesh,
      this.devP.mesh,
      this.devE3.mesh,
      this.devR.mesh
    );

    this.setPosition();
  }

  setPosition() {
    this.fromFpos =
      -param.space * 9 -
      this.southU.width / 2 -
      this.southO.width -
      this.southS.width -
      this.fromM.width -
      this.fromO.width -
      this.fromR.width -
      this.fromF.width / 2;
    this.fromRpos =
      -param.space * 8 -
      this.southU.width / 2 -
      this.southO.width -
      this.southS.width -
      this.fromM.width -
      this.fromO.width -
      this.fromR.width / 2;
    this.fromOpos =
      -param.space * 7 -
      this.southU.width / 2 -
      this.southO.width -
      this.southS.width -
      this.fromM.width -
      this.fromO.width / 2;
    this.fromMpos =
      -param.space * 6 -
      this.southU.width / 2 -
      this.southO.width -
      this.southS.width -
      this.fromM.width / 2;

    this.southSpos =
      -param.space * 2 -
      this.southU.width / 2 -
      this.southO.width -
      this.southS.width / 2;
    this.southOpos =
      -param.space * 1 - this.southU.width / 2 - this.southO.width / 2;
    this.southTpos =
      param.space * 1 + this.southU.width / 2 + this.southT.width / 2;
    this.southHpos =
      param.space * 2 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width / 2;

    this.koreaKpos =
      param.space * 6 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width +
      this.koreaK.width / 2;
    this.koreaOpos =
      param.space * 6.5 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width +
      this.koreaK.width +
      this.koreaO.width / 2;
    this.koreaRpos =
      param.space * 7.5 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width +
      this.koreaK.width +
      this.koreaO.width +
      this.koreaR.width / 2;
    this.koreaEpos =
      param.space * 8.5 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width +
      this.koreaK.width +
      this.koreaO.width +
      this.koreaR.width +
      this.koreaE.width / 2;
    this.koreaApos =
      param.space * 9.5 +
      this.southU.width / 2 +
      this.southT.width +
      this.southH.width +
      this.koreaK.width +
      this.koreaO.width +
      this.koreaR.width +
      this.koreaE.width +
      this.koreaA.width / 2;

    this.crtvCpos =
      -param.space * 12 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width -
      this.crtvT.width -
      this.crtvA.width -
      this.crtvE.width -
      this.crtvR.width -
      this.crtvC.width / 2;
    this.crtvRpos =
      -param.space * 11 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width -
      this.crtvT.width -
      this.crtvA.width -
      this.crtvE.width -
      this.crtvR.width / 2;
    this.crtvEpos =
      -param.space * 10 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width -
      this.crtvT.width -
      this.crtvA.width -
      this.crtvE.width / 2;
    this.crtvApos =
      -param.space * 9 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width -
      this.crtvT.width -
      this.crtvA.width / 2;
    this.crtvTpos =
      -param.space * 8 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width -
      this.crtvT.width / 2;
    this.crtvIpos =
      -param.space * 7 -
      this.crtvE2.width -
      this.crtvV.width -
      this.crtvI.width / 2;
    this.crtvVpos = -param.space * 6 - this.crtvE2.width - this.crtvV.width / 2;
    this.crtvE2pos = -param.space * 5.5 - this.crtvE2.width / 2;

    this.devEpos = param.space * 1 + this.devD.width / 2 + this.devE.width / 2;
    this.devVpos =
      param.space * 1.5 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width / 2;
    this.devE2pos =
      param.space * 2 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width / 2;
    this.devLpos =
      param.space * 3 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width +
      this.devL.width / 2;
    this.devOpos =
      param.space * 4 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width +
      this.devL.width +
      this.devO.width / 2;
    this.devPpos =
      param.space * 5 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width +
      this.devL.width +
      this.devO.width +
      this.devP.width / 2;
    this.devE3pos =
      param.space * 6 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width +
      this.devL.width +
      this.devO.width +
      this.devP.width +
      this.devE3.width / 2;
    this.devRpos =
      param.space * 7 +
      this.devD.width / 2 +
      this.devE.width +
      this.devV.width +
      this.devE2.width +
      this.devL.width +
      this.devO.width +
      this.devP.width +
      this.devE3.width +
      this.devR.width / 2;

    this.fromF.mesh.position.x = this.fromFpos;
    this.fromR.mesh.position.x = this.fromRpos;
    this.fromO.mesh.position.x = this.fromOpos;
    this.fromM.mesh.position.x = this.fromMpos;

    this.southS.mesh.position.x = this.southSpos;
    this.southO.mesh.position.x = this.southOpos;
    this.southT.mesh.position.x = this.southTpos;
    this.southH.mesh.position.x = this.southHpos;

    this.koreaK.mesh.position.x = this.koreaKpos;
    this.koreaO.mesh.position.x = this.koreaOpos;
    this.koreaR.mesh.position.x = this.koreaRpos;
    this.koreaE.mesh.position.x = this.koreaEpos;
    this.koreaA.mesh.position.x = this.koreaApos;
  }

  toEN() {
    let easeIn = "back.in(2)";
    let inDuration = 2;
    let inDealy = 0;
    let out = "elastic.out(1 ,0.5)";
    let outDuration = 2;
    let outDelay = 2;

    gsap.to(this.fromF.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.fromR.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.fromO.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.fromM.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.southS.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.southO.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.southT.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.southH.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.koreaK.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.koreaO.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.koreaR.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.koreaE.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.koreaA.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    // EN

    gsap.to(this.crtvC.mesh.position, {
      x: this.crtvCpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvR.mesh.position, {
      x: this.crtvRpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvE.mesh.position, {
      x: this.crtvEpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvA.mesh.position, {
      x: this.crtvApos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvT.mesh.position, {
      x: this.crtvTpos,
      duration: 2,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvI.mesh.position, {
      x: this.crtvIpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvV.mesh.position, {
      x: this.crtvVpos,
      duration: 2,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.crtvE2.mesh.position, {
      x: this.crtvE2pos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devE.mesh.position, {
      x: this.devEpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devV.mesh.position, {
      x: this.devVpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devE2.mesh.position, {
      x: this.devE2pos,
      duration: 2,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devL.mesh.position, {
      x: this.devLpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devO.mesh.position, {
      x: this.devOpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devP.mesh.position, {
      x: this.devPpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devE3.mesh.position, {
      x: this.devE3pos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.devR.mesh.position, {
      x: this.devRpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.helloTypo.mesh.rotation, {
      y: Math.PI * 2,
      duration: 2,
      ease: "power3.out",
    });
  }

  toKO() {
    gsap.to(this.helloTypo.mesh.rotation, {
      y: -Math.PI * 2,
      duration: 2,
      ease: "power3.out",
    });

    let easeIn = "back.in(2)";
    let inDuration = 2;
    let inDealy = 0;
    let out = "elastic.out(1 ,0.5)";
    let outDuration = 2;
    let outDelay = 2;

    gsap.to(this.crtvC.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvR.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvE.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvA.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvT.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvI.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvV.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.crtvE2.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devD.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devE.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devV.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devE2.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devL.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devO.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devP.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devE3.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    gsap.to(this.devR.mesh.position, {
      x: 0,
      duration: inDuration,
      ease: easeIn,
      delay: inDealy,
    });

    // KO
    gsap.to(this.fromF.mesh.position, {
      x: this.fromFpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.fromR.mesh.position, {
      x: this.fromRpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.fromO.mesh.position, {
      x: this.fromOpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.fromM.mesh.position, {
      x: this.fromMpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.southS.mesh.position, {
      x: this.southSpos,
      duration: 2,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.southO.mesh.position, {
      x: this.southOpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.southT.mesh.position, {
      x: this.southTpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.southH.mesh.position, {
      x: this.southHpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.koreaK.mesh.position, {
      x: this.koreaKpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.koreaO.mesh.position, {
      x: this.koreaOpos,
      duration: 2,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.koreaR.mesh.position, {
      x: this.koreaRpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.koreaE.mesh.position, {
      x: this.koreaEpos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });

    gsap.to(this.koreaA.mesh.position, {
      x: this.koreaApos,
      duration: outDuration,
      ease: out,
      delay: outDelay,
    });
  }

  update() {
    if (this.fromF.mesh.position.x == 0) {
      this.descEN.visible = true;
      this.descKO.visible = false;
    }
    if (this.crtvC.mesh.position.x == 0) {
      this.descEN.visible = false;
      this.descKO.visible = true;
    }
  }
}

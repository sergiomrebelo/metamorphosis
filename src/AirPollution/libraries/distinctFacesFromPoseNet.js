/** Adapted by Danie'Lopes from the Processing sketch: **/
/**
 * Which Face Is Which
 * Daniel Shiffman
 * http://shiffman.net/2011/04/26/opencv-matching-faces-over-time/
 *
 * Modified by Jordi Tost (call the constructor specifying an ID)
 * @updated: 01/10/2014
 */
 let faceList = [], faceCount = 0;

 class Face {
     constructor(newID, pose) {
         this.update(pose);
         this.justGotReady = false;
         this.readyToUse = false;
         this.available = true; // Am I available to be matched?
         this.delete = false; // Should I be deleted?
         this.timeToDie = 60;
         this.timer = this.timeToDie; // How long should I live if I have disappeared?
         this.readyToUseTime = 30;
         this.lifeTime = 0;
         this.id = newID; // Assign a number to each face
         this.minKeypointConfidence = 0; //0.2;
     }
 
     static onNewFaceDetected(f) { //fires once if a face is created. returns the dead face as a param
 
     }
 
     static onFaceDead(f) { //fires if a face dies. returns the dead face as a param
 
     }
 
     onDead() { //to override if you want a specific face  to fire  a specific  thing when  it dies
 
     }
 
     static faceCircle(pose) {
         let faceParts = ["nose", "leftEar", "rightEar", "leftEye", "rightEye"],
             faceWidth = Number.NEGATIVE_INFINITY, v, v2, meanPos = createVector(0, 0);
 
         for (let i = 0; i < faceParts.length; i++) {
             let p = pose[faceParts[i]];
             if (p.confidence <= this.minKeypointConfidence) continue;
 
             v = createVector(p.x, p.y);
 
             meanPos.add(v);
 
             for (let j = i + 1; j < faceParts.length; j++) {
                 let p2 = pose[faceParts[j]];
                 v2 = createVector(p2.x, p2.y);
                 let d = v2.copy().sub(v).mag();
                 if (d > faceWidth) faceWidth = d;
             }
 
         }
 
         meanPos.div(faceParts.length);
 
         return {center: meanPos, width: faceWidth}
     }
 
     drawDebug(flipText = false) {
         noFill();
         stroke(1);
         ellipse(this.center.x, this.center.y, this.width, this.width)
 
         fill(255, map(this.timer, this.timeToDie, 0, 255, 0));
         
         push();
         if (flipText) {
             translate(this.center.x, 0);
             scale(-1, 1);
             translate(-this.center.x, 0);
         }
         text("id: " + this.id, this.center.x + 10, this.center.y);
         text("timer: " + this.timer, this.center.x + 10, this.center.y + 15);
         pop();
 
         this.drawKeyPoints();
     }
 
     update(newPose) {
         this.pose = newPose.pose;
         this.timer = this.timeToDie;
         let fc = Face.faceCircle(this.pose);
         this.center = fc.center;
         this.width = fc.width;
         this.r = {
             x: this.center.x - this.width / 2,
             y: this.center.y - this.width / 2,
             width: this.width,
             height: this.width
         };
         this.lifeTime++;
 
         let pReadyToUse = this.readyToUse;
         if (this.lifeTime > this.readyToUseTime) this.readyToUse = true;
         if (pReadyToUse !== this.readyToUse) {
             this.justGotReady = true;
             console.log("new face: " + this.id);
             Face.onNewFaceDetected(this);
         } else {
             this.justGotReady = false;
         }
 
     }
 
     countDown() {
         this.timer--;
     }
 
     dead() {
         return this.timer < 0;
     }
 
     drawKeyPoints() {
         for (let j = 0; j < this.pose.keypoints.length; j++) {
             let keypoint = this.pose.keypoints[j];
             if (keypoint.score > this.minKeypointConfidence) {
                 fill(255, 0, 0);
                 noStroke();
                 ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
             }
         }
     }
 }
 
 
 function cleanRepeatedPoses() {
     let toRemove = [];
 
     for (let i = 0; i < poses.length; i++) {
         if (poses[i].pose.score < 0.3) toRemove.push(poses[i]);
         continue;
 
         let f1 = Face.faceCircle(poses[i].pose);
 
         for (let j = i + 1; j < poses.length; j++) {
             let f2 = Face.faceCircle(poses[j].pose);
             if (dist(f1.center.x, f1.center.y, f2.center.x, f2.center.y) <= max(f1.width / 2, f2.width / 2)) toRemove.push(poses[i]);
         }
     }
 
     //delete remaining
     for (let i of toRemove) {
         poses.splice(poses.indexOf(toRemove[i]), 1);
     }
 }
 
 function detectDistinctFaces(poses) {
     cleanRepeatedPoses();
 
     // Check if the detected faces already exist are new or some has disappeared:
     // SCENARIO 1
     // faceList is empty
     if (faceList.length <= 0) {
         // Just make a Face object for every face Rectangle
         for (let i = 0; i < poses.length; i++) {
             //print("+++ New face detected with ID: " + faceCount);
             faceList.push(new Face(faceCount, poses[i]));
             faceCount++;
         }
 
         // SCENARIO 2
         // We have fewer Face objects than face detections found from OPENCV
     } else if (faceList.length <= poses.length) {
         let used = [];
         // Match existing Face objects with a Rectangle
         for (let f of faceList) {
             // Find poses[index] that is closest to face f
             // set used[index] to true so that it can't be used twice
             let record = Number.POSITIVE_INFINITY, index = -1;
             for (let i = 0; i < poses.length; i++) {
                 let pose = poses[i].pose,
                     center = Face.faceCircle(pose).center;
                 let d = dist(center.x, center.y, f.center.x, f.center.y);
 
                 if (d < record && !used[i]) {
                     record = d;
                     index = i;
                 }
             }
             // Update Face object location
             used[index] = true;
             f.update(poses[index]);
         }
         // Add any unused poses
         for (let i = 0; i < poses.length; i++) {
             if (!used[i]) {
                 //print("+++ New face detected with ID: " + faceCount);
                 faceList.push(new Face(faceCount, poses[i]));
                 faceCount++;
             }
         }
 
         // SCENARIO 3
         // We have more objects than face detections
     } else {
         // All Face objects start out as available
         for (let f of faceList) f.available = true;
 
         // Match detection with a Face object
         for (let i = 0; i < poses.length; i++) {
             // Find face object closest to poses[i] Rectangle
             // set available to false
             let record = Number.POSITIVE_INFINITY,
                 index = -1,
                 pose = poses[i].pose,
                 center = Face.faceCircle(pose).center;
 
             for (let j = 0; j < faceList.length; j++) {
                 let f = faceList[j],
                     d = dist(center.x, center.y, f.center.x, f.center.y);
                 if (d < record && f.available) {
                     record = d;
                     index = j;
                 }
             }
             // Update Face object location
             let f = faceList[index];
             f.available = false;
             f.update(poses[i]);
         }
         // Start to kill any left over Face objects
         for (let f of faceList) {
             if (f.available) {
                 f.countDown();
                 if (f.dead()) {
                     if (f.readyToUse) {
                         Face.onFaceDead(f);
                         f.onDead();
                     }
                     f.delete = true;
                 }
             }
         }
     }
 
     // Delete any that should be deleted
     for (let i = faceList.length - 1; i >= 0; i--) {
         let f = faceList[i];
         if (f.delete) faceList.splice(i, 1);
     }
 
     return faceList.filter(f => f.readyToUse);
 }
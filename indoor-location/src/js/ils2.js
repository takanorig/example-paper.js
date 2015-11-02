

function Person(id, gender) {
    this.id = id;
    this.gender = gender;
    this.image = gender ? 'images/man.png' : 'images/woman.png';
    this.point = new Point(0, 0);

    this.raster = new Raster(this.image);
    this.raster.visible = false;
    this.raster.scale(0.2);
}

Person.prototype = {
    draw: function () {
        if (!this.raster) {
            return;
        }
        this.raster.visible = true;
    },

    move: function (point) {
        if (!this.raster) {
            return;
        }
        this.raster.position = point;
    },

    checkBorder: function () {
        var areaSize = view.size;
        var point = this.raster.position;
        if (point.x < 0 || point.x > areaSize.width) {
            var newAngle = 180 - this.vector.angle;
            if (newAngle < 0) {
                newAngle = newAngle + 360;
            }
            // console.log(this.vector.angle + ' -> ' + newAngle);
            this.vector = new Point({
                angle: newAngle,
                length: 1
            });
        }

        if (point.y < 0 || point.y > areaSize.height) {
            var newAngle = 135 + this.vector.angle;
            if (newAngle > 360) {
                newAngle = newAngle - 360;
            }
            this.vector = new Point({
                angle: newAngle,
                length: 1
            });
        }
    },

    iterate: function () {        
        // ランダムに移動の方向性を与える。
        if (!this.vector) {
            this.vector = new Point({
                angle: 360 * Math.random(),
                // angle: 45,
                length: 1
            });
        }

        this.checkBorder();

        this.raster.position += this.vector;
    }
};


//--------------------- main ---------------------

var people = [];
var peopleNum = 20;

for (var i = 0; i < peopleNum; i++) {
    var id = 'person-' + i;
    var gender = Math.random() <= 0.5 ? 0 : 1; // 0:male, 1:female
	
    var person = new Person(id, gender);
    people.push(person);

    var position = Point.random() * view.size;
    person.move(position);
    person.draw();
}

function onFrame() {
    for (var i = 0; i < people.length; i++) {
        people[i].iterate();
    }
}

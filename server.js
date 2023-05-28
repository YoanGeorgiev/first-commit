let canvas, canvas_size = 5;
// Създава двумерен масив
// Всеки елемент е обект
// {r: ???, g:???, b:???}
function make_canvas(n) {
    canvas = [];
    for(let i = 0; i < n; i++) {
        canvas[i] = [];
        for (let j = 0; j < n; j++) {
            canvas[i][j] = {
                r: 255,
                g: 255,
                b: 255
            }
        }
    }
}
 
function update_canvas(col, row, new_r, new_g, new_b) {
    console.log(col, row);
    canvas[col][row] = {
        r: new_r,
        g: new_g,
        b: new_b
    }
}
 
make_canvas(canvas_size);
 
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
 
app.get("/", function(req, res) {
    res.status(200);
    
	
	res.sendFile(path.join(__dirname,"public", "start.html"));
	
});
 
app.get("/game.js", function(req, res){
	res.status(200);
	
	res.sendFile(path.join(__dirname,"public", "game.js"));

});
app.get("/map", function(req, res) {
    res.status(200);
    res.json(canvas);

});
 
app.put("/risuvai", function(req, res) {
    let X = parseInt(req.query.X),
        Y = parseInt(req.query.Y),
        R = parseInt(req.query.R),
        G = parseInt(req.query.G),
        B = parseInt(req.query.B);
 
    if(isNaN(X)) {
        res.status(400);
        res.send("X trqbva da e chislo");
        return;
    }
    if(X < 0 || X >= canvas_size) {
        res.status(400);
        res.send("X trqbva da e mejdu 0 i " + canvas_size);
        return;
    }
    if(R < 0 || R > 255) {
        res.status(400);
        res.send("R trqbva da e mejdu 0 i 255");
        return;
    }
    update_canvas(X, Y, R, G, B);
    res.status(200);
    res.send("Uspeshno risuvane");
});
app.listen(port, function () {
    console.log("Server is listening on port:" + port);

    });
	
	
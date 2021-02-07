(function(document){

    const margin = 10;
    const canvas = document.getElementById('texture')
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', startPainting); 
    canvas.addEventListener('mouseup', stopPainting); 
    canvas.addEventListener('mousemove', sketch); 

    document.getElementById('erase').addEventListener('click', erase);

    ctx.canvas.width = 256;
    ctx.canvas.height = 256;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    /*
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ff0';
    ctx.fillRect(margin, margin, ctx.canvas.width-margin*2, ctx.canvas.height-margin*2);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(128, 128, 100, 100, 0, 0, 2 * Math.PI);
    ctx.fill();
    */


    // Stores the initial position of the cursor 
    let coord = {x:0 , y:0};  
    
    // This is the flag that we are going to use to  
    // trigger drawing 
    let paint = false; 
        
    // Updates the coordianates of the cursor when  
    // an event e is triggered to the coordinates where  
    // the said event is triggered. 
    function getPosition(event){ 
        coord.x = event.clientX - canvas.offsetLeft; 
        coord.y = event.clientY - canvas.offsetTop; 
    } 
    
    // The following functions toggle the flag to start 
    // and stop drawing 
    function startPainting(event){ 
        paint = true; 
        getPosition(event); 
    } 
    function stopPainting(){ 
        paint = false; 
    } 
        
    function sketch(event){ 
        if (!paint) return; 
        ctx.beginPath(); 
            
        ctx.lineWidth = 5; 
        
        // Sets the end of the lines drawn 
        // to a round shape. 
        ctx.lineCap = 'round'; 
            
        ctx.strokeStyle = 'black'; 
            
        // The cursor to start drawing 
        // moves to this coordinate 
        ctx.moveTo(coord.x, coord.y); 
        
        // The position of the cursor 
        // gets updated as we move the 
        // mouse around. 
        getPosition(event); 
        
        // A line is traced from start 
        // coordinate to this coordinate 
        ctx.lineTo(coord.x , coord.y); 
            
        // Draws the line. 
        ctx.stroke(); 
    } 
    function erase(){
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

})(document);
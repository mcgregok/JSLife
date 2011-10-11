var Game = 
(function(){
  /*Private Variables*/
  /*context*/
  var ctx= false;
  var self = this;

  /*state*/
  var vsync = false;
  var interval_id =  false;
  var lap = 0;

  /*member variables*/
  var map = [];
  
  /* construction */
  (function Game(){
    if (document.getElementById('frame').getContext)
    {
      ctx = document.getElementById('frame').getContext('2d');
    }
    else
    {
      return false;
    }

    //generate map
    var startmap = [];

    for(var y = 0; y < 90; y++)
    {
      var row = [];

      for(var x = 0; x < 90; x++)
      {
        var state = Math.random();
        state = (state > 0.8)? 1:0;
        row[x] = state;
      }
      startmap[y] = row;
    }

    map = startmap;
    interval_id = setInterval(function(){loop();}, 50);
  })();
  /*end constructor*/

  /*private functions*/

  /*end private functions*/


  /*public functions*/
  self.loop = function()
  {
    if (document.getElementById('frame').getContext && vsync == false)
    {
      vsync = true;
      draw();
      step();
      vsync = false;
      lap++;
    }
    
  }

  self.draw = function ()
  {
    ctx.save();
    ctx.clearRect(0,0,450,475);
    ctx.fillStyle = "rgb(0,0,0)";

    for(var y = 0; y < 90; y++)
    {
      for(var x = 0; x < 90; x++)
      {
        if(map[y][x] == 1)
	{
          ctx.fillRect (x*5, y*5, 5, 5);
        }
      }
    }

    /**/ 
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillText('cycle: ' + lap.toString(), 400, 470,50);
    ctx.restore();
    ctx.fill();
  }

  self.step = function()
  {
    var output = '';
    supercount = 0;

    var tempmap = [];

    for(var y = 0; y < 90; y++)//work around for arrays passing by reference.
    {
      tempmap[y] = map[y].slice(0);
    }
    
    for(var y = 0; y < 90; y++)
    {
      for(var x = 0; x < 90; x++)
      {
        var countme = getNeighborCount(y,x);

        if ( map[y][x] === 0 ) // dead cell  
        {
          if ( countme == 3 )  
          {  
            tempmap[y][x] = 1;  
          }
        }  
	else
	{  
          if ( ( countme == 2 ) || ( countme == 3) )
          {  
            tempmap[y][x] = 1;  
          }  
          else  
          {  
            tempmap[y][x] = 0 ;  
          }  
        }  
      }		
    }	
    map = tempmap;
  }
	
  self.getNeighborCount = function (starty,startx)
  {
    var count = 0;

    for(var y = starty-1; y <= starty+1; y++)
    {
      for(var x = startx-1; x <= startx+1; x++)
      {
        if((y >= 0 && y < 90 && x >= 0 && x < 90) && (startx != x || starty != y) && (map[y][x] == 1))
	{
          count++;
        }
      }
    }		
    return count;
  }
  /*end public functions*/

  return self;
})();

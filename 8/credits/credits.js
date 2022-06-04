const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

function background() {
    var audio = new Audio('./CreditMusic.wav');
    audio.play();
}

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900

    background()

    //controls where credits begin, not speed
    let scrollOffset = canvas.height + 2550
    let center = 0
    let fade = "8"
    let alpha = 1
    let wait = 0

    function thanks() {
        c.fillStyle = 'rgba(136, 8, 8, 1)';
        c.font = '100px WhoAsksSatan';
        //displays backwards
        c.fillText("Thanks for playing!", measureText("Thanks for playing!"), 450);
    }

    function fadeIn() {
        c.fillStyle = 'rgba(0, 0, 0, ' + (alpha / 50) + ')';
        c.font = '500px WhoAsksSatan';
        //displays backwards
        c.fillText(fade, measureText(fade), 450);
        return alpha
    }

    function fadeOut() {
        c.fillStyle = 'rgba(0, 0, 0, ' + (alpha / 50) + ')';
        c.font = '500px WhoAsksSatan';
        //displays backwards
        c.fillText(fade, measureText(fade), 450);
        return alpha
    }

    function measureText(text) {
        center = 925 - (c.measureText(text).width / 2)
        return center
    }

    function displayStatusText(context, y) {
        //displays backwards

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("", measureText(""), y);
        context.fillText("Franks Laboratory", measureText("Franks Laboratory"), y -100);
        context.fillText("Lofi Girl", measureText("Lofi Girl"), y -200);
        context.fillText("Addy Erickson", measureText("Addy Erickson"), y - 300);
        context.fillText("Chris Courses", measureText("Chris Courses"), y - 400);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Special Thanks To", measureText("Special Thanks To"), y - 500);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("chrisvile.com", measureText("chrisvile.com"), y - 700);
        context.fillText("Who Asks Satan: Chris Vile", measureText("Who Asks Satan: Chris Vile"), y - 800);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Font", measureText("Font"), y - 900);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Dripping, Slow, A Sound Effect: InspectorJ", measureText("Dripping, Slow, A Sound Effect: InspectorJ"), y - 1100);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Sound Effects: Melanie Villarreal", measureText("Sound Effects: Melanie Villarreal"), y - 1200);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Sounds", measureText("Sounds"), y - 1300);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Lead programmer: Liam Erickson", measureText("Lead programmer: Liam Erickson"), y - 1500);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Programming", measureText("Programming"), y - 1600);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Puzzle design: Melanie Villarreal", measureText("Puzzle design: Melanie Villarreal"), y - 1800);
        context.fillText("Story design: Zach Barbour", measureText("Story design: Zach Barbour"), y - 1900);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Design", measureText("Design"), y - 2000);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Title Screen Art: Liam Erickson", measureText("Title Screen Art: Liam Erickson"), y - 2200);
        context.fillText("Lead Animator: Kayla Flint", measureText("Lead Animator: Kayla Flint"), y - 2300);
        context.fillText("Lead Artist: Kayla Flint", measureText("Lead Artist: Kayla Flint"), y - 2400);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Art", measureText("Art"), y - 2500);
        // context.measureText().width
    }

    function updateText(y) {
        displayStatusText(c, y)
    }

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = '#222222'
        c.fillRect(0, 0, canvas.width, canvas.height)
        if (wait < 50) {
            wait++
        } else if (wait >= 50 && wait < 225) {
            wait++
            alpha++
            alpha = fadeIn();
        } else if (wait == 225 && alpha > 0) {
            alpha--
            alpha = fadeOut();
        } else if (alpha == 0 && scrollOffset > -50) {
            scrollOffset-=2
            updateText(scrollOffset)
        } else if (scrollOffset == -50 && wait <= 400) {
            wait++
            //console.log(wait)
            thanks()
        } else {
            location.href = '../../8TitleScreen'
        }
    }

    animate()
})
const canvas = document.querySelector('canvas')

var myFont = new FontFace('WhoAsksSatan', 'url(../GlobalAssets/fonts/WhoAsksSatan.ttf)')

myFont.load().then(function (font) {

    document.fonts.add(font)

    const c = canvas.getContext('2d')

    canvas.width = 1850
    canvas.height = 900
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
        c.fillStyle = 'rgba(0, 0, 0, ' + (alpha / 300) + ')';
        c.font = '500px WhoAsksSatan';
        //displays backwards
        c.fillText(fade, measureText(fade), 450);
        return alpha
    }

    function fadeOut() {
        c.fillStyle = 'rgba(0, 0, 0, ' + (alpha / 300) + ')';
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
        context.fillText("Joshua Yoon", measureText("Joshua Yoon"), y);
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
        context.fillText("Sound Effects: Melanie Villarreal", measureText("Sound Effects: Melanie Villarreal"), y - 1100);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Sounds", measureText("Sounds"), y - 1200);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Lead programmer: Liam Erickson", measureText("Lead programmer: Liam Erickson"), y - 1400);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Programming", measureText("Programming"), y - 1500);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Puzzle design: Melanie Villarreal", measureText("Puzzle design: Melanie Villarreal"), y - 1700);
        context.fillText("Story design: Zach Barbour", measureText("Story design: Zach Barbour"), y - 1800);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Design", measureText("Design"), y - 1900);

        //items from below
        context.fillStyle = 'rgba(197, 227, 181, 1)';
        context.font = '65px WhoAsksSatan';
        context.fillText("Title Screen Art: Liam Erickson", measureText("Title Screen Art: Liam Erickson"), y - 2100);
        context.fillText("Lead Animator: Kayla Flint", measureText("Lead Animator: Kayla Flint"), y - 2200);
        context.fillText("Lead Artist: Kayla Flint", measureText("Lead Artist: Kayla Flint"), y - 2300);

        //title
        context.fillStyle = 'rgba(212, 234, 200, 1)';
        context.font = '100px WhoAsksSatan';
        context.fillText("Art", measureText("Art"), y - 2400);
        // context.measureText().width
    }

    function updateText(y) {
        displayStatusText(c, y)
    }

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = '#222222'
        c.fillRect(0, 0, canvas.width, canvas.height)
        if (wait < 100) {
            wait++
        } else if (wait >= 100 && wait < 450) {
            wait++
            alpha++
            alpha = fadeIn();
        } else if (wait == 450 && alpha > 0) {
            alpha--
            alpha = fadeOut();
        } else if (alpha == 0 && scrollOffset > -100) {
            scrollOffset--
            updateText(scrollOffset)
        } else if (scrollOffset == -100 && wait <= 800) {
            wait++
            //console.log(wait)
            thanks()
        } else {
            thanks()
            location.href = '../../8TitleScreen'
        }
    }

    animate()
})
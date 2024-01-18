**LIME COMPANION (TBD)**

Currently this is simply a frontend framework that uses the Bungie API to retrieve account information from a Destiny 2 profile. At the moment - and given the ultimate goal of automation it will likely remain this way - it is hard coded to work with PC only.

The reason I started this was because I was stuck maybe an hour and a half API call at my job, got bored. But really I wanted something that would run alongside the game and automate the loadout process. Conveniently, Destiny has this in the game at the moment, but also conveniently for me as a developer, it sucks. DIM has this to an extent, but my dumbass will forget to actually apply it in game and halfway through my Trials match I'll realize I'm on 3 shot golden gun Celestial Nighthawk, and I wanted to provide a solution. I don't know how to do that, but I had a little bit of frontend experience and figured I'd start with what I know, maybe try and make a nice UI/UX that DIM isn't lacking, but isn't really present either.

I also had some ideas surrounding filtering lore content. There's a lot of articles, entries, missives, books, transcripts, so forth, in and out of the game, and anyone who's tried knows that following the story of the game can be difficult. At the same time, some of the coolest world-building out there is hidden in weapon entries and lore books that comes together to develop a really intriguing universe. I wanted a way to connect this front end to that, so perhaps if you had something you wanted to know more about - a weapon perhaps - you could navigate that entry easily, and find related entries. Same going for people, places, events, the lot. 

I'm also totally open to whatever you might want to do. Just let me know, but ultimately, given that there is no strict deadline, end-result, and it's a fullstack project, I want people to do something they want to do. 

**INSTALLING**

The frontend stack is made up of NEXTJS, TS, Tailwind CSS, deployed to GH Pages instead of Vercel. You'll need Node, that's pretty easy to pick up, the rest is documented below.

I highly recommend Github Desktop since there's a lot of moving parts on this website already, and there's only two subdomains. Long form changes can be hard to track, and making sure you are pulling and pushing exactly what you want can be complicated, particularly since there's a lot of random files that you don't want to be interacting with (as much as we may try, no one will have the same package.json).

I believe I'm the only one who can deploy changes to the server. If not, the yaml file has it set up so that pushes from the git terminal will deploy on the live website. Which, if you are not doing something super final, is not good, so another reason for Github Desktop.

I know this isn't a proper Vercel deployment with a production server and a testing server and a live app and all the checks and balances between, but for now, changes will have to be scrutinized locally, and careful testing must be implemented for each pull request. Needless to say, this is already buggy, but that's why you, the reader, are here. Partially. Maybe.

Forking the repository will not net you Nextjs, you will have to install that in the folder where you have forked the repository. This app uses the page routing, and so you need to install this manually. 

> npm install next@latest react@latest react-dom@latest

Installation guide (though it's very simple) [https://nextjs.org/docs/getting-started/installation]

Running is not as simple as

> npm run dev

This will work if you purely want to make contributions to the landing page, but because the Bungie API requires the https certificate, you'll need to proxy your localhost with a key. I use the package local-ssl-proxy, which you can install with 

> npm install -g local-ssl-proxy

This isn't quite enough, since we need a trusted certificate. The package conveniently gives instructions for another certificate software, mkcert. On Windows you can use Chocolately or Scoop to install this, on mac Brew (or something idk don't have a Mac, and Linxu uses gl). I used Scoop:

in Powershell

> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression

On one machine I had an issue with admin rights where running as an admin didn't fix it; look it up there's a Stackoverflow page or a git thread on it with a couple solutions.

From there

> scoop bucket add extras
> scoop install extras/mkcert

And that's all the dependencies.


From command line (or wherever you run node idk)

> npm run dev

and in Powershell (I like to split my terminal in VSCode between command line and Powershell)

> npx local-ssl-proxy \ --key localhost-key.pem \ --cert localhost.pem \ --source 3001 \ --target 3000

Then on your browser of choice

[https://localhost:3001/lime-companion]

You'll be greeted by my bland landing page, click the Authorize button, you'll be prompted to log in to your Bungie account, and transferred to the main page.

**ROUTING, FILE STRUCTURE, DESIGN PHILOSOPHY**

Because I want my domain to be my domain, the landing page is on 

> /lime-companion/

and the project routes from there. The only other page at the moment is 

> lime-companion/inventory(your access code)

Ultimately I'd like the access code not to be in the subdomain, but I don't know how to do that. Also if you close or refresh the site, you need a new access code, though in theory you shouldn't need one. (I'll properly list out issues later on)

In the pages router it's really easy to make a subdomain, just make a .tsx file in the pages directory. That's it. 

Fetch.tsx exports functions corresponding to every API call I make. After you authorize, the first two functions are called, to route you to the Authorize page, handle the subsequent redirection, and store and use the access code. 

inventory.tsx is the hub for the majority of everything. Very simply, it loads your inventory before displaying anything, contextualizes all the information that the different components needs, and gives them that information. There are four important components, the loading screen, the navbar, the sidebar, and the page itself. These are all imported from the components directory.

If you've used Nextjs, particularly the page routing method, this should all look pretty typical.

Main has the important stuff that didn't have enough subcomponents to warrant its own file. CharacterInventory takes up everything on the current page, split between what you have equipped and what you have in your inventory. Right now it's just weapons, the array can be expanded to show more, but the logic isn't implemented for that to work at the moment, nor is the page developed to really allow you to use more than what's displayed on 100vh. One step at a time.

The sidebar allows you to change your character and refresh the information on the API. Nothing else does anything at the moment.

The navbar currently only displays what class you have picked. Obviously it'll do more, routing, display more information, but more needs to be there for it to work.

I try and provide information to a component on a need-to-know basis to keep complexity down. At the same time, you can see on inventory I have like 5 ContextProviders (though I could cut this amount, I wrote each I realized I needed a piece of information). API calls should be relegated to Fetch if possible, keeping that out of React apps makes handling the asynchronous information gathering simpler. 

**ISSUES**

> My API key is exposed. That's, I mean, like that's a big problem if this actually gets finished and launched. The .env file normally hides this information to users, so properly configuring that has to happen, but I haven't taken the time to do that yet since outside of myself, I've only shared the URL with people who I trust not to steal my Bungie account. This includes you :D.

> There should be two API keys, one for the live domain, and one for local testing. After authentication, you're rerouted to a redirect URL you provide the API, and because I have one key that url is [https://localhost:3001/lime-companion/inventory]. Interestingly enough, you can use the live version of the site ([https://lethargiclime.github.io/lime-companion/]) if you have you're local server running since the landing page will redirect you to you're localhost. At some point there should be two keys, one for live and one for local.

> The loading screen doesn't properly wait for all the API calls to finish. If you load into the site and immediately select a character you might get an error. I haven't ever had to work with asynchronous stuff so I genuinely don't know what to do.

> Sometimes the inventory doesn't display, just what you have equipped. I can't figure this one out, been working on it for a couple days.

> Information should stay on the cache and a backened should have the manifest so that way the loading time isn't horrendous. DIM (as far as I know) has it set so that all of your information is stored in your browsers cache. When you move something around, rather than calling the API it just moves it on it's backend data structure. That's why when you refresh the API it duplicates some information. Currently to figure out if a crafted item should have the masterwork appearence I call the API ~16 times, retrieving each perk and then seeing if the first one is an Enhanced Intrinsic. Naturally for this use case alone I only need to do it once, but if wanted to display perk information, there's no way around that except having the manifest on the backend instead of using the API.

**USING THE API**

Bungie's API works exactly like the next one. You need a key, and for some things you'll need an authorization code (you get that when you authorize you're account). I have both in a simple data structure I use when I'm calling the API. Calling the API is exactly how you would any other in JS, just look at the code I already have written.

They also provide a couple resources, an explorer and a big ass documentation.

[https://data.destinysets.com/]

[https://bungie-net.github.io/]

If you've made it this far into the doc and want to try and learn a bit about how I've gotten as far as I am know, go in Python and make some calls, or use the API explorer and try and get some information.

And that's it. Light stuff. I know this is a massive wall of text, I don't expect you to read this through, just if you get stuck to refer to things in here (or ask me). I plan on going over everything in here in the first couple days of RCOS, but if you need a refresher, it's all here. Also this needs to get updated as we make progress, particularly on what the site actually does.

Toodle-oo.

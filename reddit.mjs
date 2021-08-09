#! /usr/bin/env node
import fetch from 'node-fetch'
import open from 'open'
import yargs from 'yargs'
import {aclean} from '../forontendnode/app.mjs'


// const arr=['hello', 'abde','hello','abde','how '];
// const arr2 =[...arr].concat(process.argv);
// console.log(aclean(arr2))
// aclean(arr2).forEach((v,k)=>
// {
//     console.log(`${k}:${v}`);
// })
const { argv } = yargs(process.argv).scriptName("reddit")
.usage("Usage: $0 -p num or $0 -p -r")
.example(
  "$0 -p num or $0 -p -r"

)
.option("p", {
  alias: "print",
  describe: "choose a post with a number",
  
})
.option("r", {
  alias: "rand",
  describe: "choose post randomly",
})
.option("o", {
    alias: "open",
    describe: "redirect to post link",
  })
.option("h", {
    alias: "help",
  })
.describe("help", "Show help.") // Override --help usage message.
.describe("version", "Show version number.") // Override --version usage message.
.epilog("copyright 2021");

const res = await fetch('https://www.reddit.com/.json');
const data= await res.json();
const children = data.data.children;
const randomIndex=children[Math.floor(Math.random()*children.length)]
const num=Math.floor(Math.random()*children.length);

if ( argv.print &&argv.rand )
{
try{
    console.log(`title:${children[num].data.title},
    Link_post : https://reddit.com${children[num].data.permalink}`)
}
catch(e)
{
  
}
}
else if (argv.print)
{
    try{
console.log(`title:${children[argv.print].data.title},
Link_post : https://reddit.com${children[argv.print].data.permalink}`)}
catch(e)
{
    console.log('try reddit -p num or');
}
}
else if(argv.open){
  open(`https://reddit.com${children[argv.open].data.permalink}`);  
}
else ( argv.help )
{
//console.log('You shoud be entering something like that \n reddit --print=[number of the post]');
console.log('try reddit -h to see the documentation')
}

const mysql = require("mysql2");
const koa = require("koa");
const Koarouter = require("koa-router");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require('koa-bodyparser')
const app = new koa();
const router = new Koarouter();


app.use(bodyParser())
render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

const employees = [
  {
    name: "Joyce",
    email: "joyce@creditap.in",
    Phone:"9876543210",
    designation:"Co-Founder/CFO/HR"
  },
  {
    name: "Vinesh Kumar",
    email:'vinesh@creditap.in',
    phone:'1234567890',
    designation:'GM'
  },
  {
      name:"Aravidan",
      email:"aravindan@creditap.in",
      phone:"1234987650",
      designation:'Founder/CEO'
  }
];
router.get("/index", async (ctx) => {
  await ctx.render("index");
});
router.get("/employee/:id", (ctx) => {
  ctx.body = employees[ctx.params.id];
});
router.get("/employees",ctx=>{
    ctx.body=employees
})
router.get("/", (ctx) => ctx.body);
router.post('/addEmployee',(ctx)=>{
    const body = ctx.request.body
     employees.push(body)
     ctx.redirect('/employees')
})

app.use(router.routes()).use(router.allowedMethods());

// app.use(async ctx=>ctx.body={msg:"Hello World"})
const PORT = 4040;
app.listen(PORT, () => console.log("Listening"));

const mySqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "44163246",
  database: "EMPLOYEEdb",
});
mySqlConnection.connect((err) => {
  if (!err) {
    console.log("DB connected");
  } else {
    console.log("Some error", JSON.stringify(err));
  }
});

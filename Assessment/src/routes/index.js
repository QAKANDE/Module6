const express = require("express")
const db = require("../db")
const route = express.Router()
const sgMail = require('@sendgrid/mail');



route.get('/', async (req,res) =>
{
    const response = await db.query("SELECT * from assessment")
    const randomStudent = Math.floor(Math.random() * response.rowCount);
    console.log(randomStudent)
    const student = response.rows[randomStudent]
    const deletedStudent = await db.query(`DELETE FROM assessment WHERE name=$1`, [student.name])
    res.send(student)  
})
route.post('/' , async (req,res)=>{
    const response =  await db.query('INSERT INTO "assessment"(name) values ($1) returning *',[req.body.name])
    res.send(response.rows)
})

route.get('/:id' ,async(req,res)=>{
    const response = await db.query(`SELECT * FROM "student" where _id=$1`,[req.params.id])
    const firstPDF = response.rows
    console.log(firstPDF[0].name)
    var fonts = {
        Roboto: {
            normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
            bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
            bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
        }
    };
    let printer = new PdfPrinter(fonts)
    let doc = {
        pageMargins: [150, 50, 150, 50],
        content: [
            { text: `Welcome ${firstPDF.firstname}`, fontSize: 25, background: 'yellow', italics: true },
            "                                                                      ",
            `Thanks for joining ${firstPDF.email} ${firstPDF.secondname}!`,
            'I hope you will have fun, and dont forget to get drunk!',
        ]
    }
    var pdfDoc = printer.createPdfKitDocument(doc);
     await pdfDoc.pipe(fs.createWriteStream(path.join(pdfpath,`${firstPDF[0]._id}.pdf`)))
    pdfDoc.end()
    console.log(pdfpath)
    
    const pdfToBeSent = path.join(__dirname , "../pdf/1.pdf")
    let data_base64 = data.toString('base64')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
        to: 'quadriomofolarinakande@gmail.com',
        from: 'test@example.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `${response.rows}`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        // attachments:[
        //     {
        //         attachments: [{
        //             filename: pdfToBeSent,
        //             content: data_base64,
        //             type: 'application/pdf',
        //             disposition: 'attachment',
        //         }],
        //     }
        // ]
    };
    sgMail.send(msg);
    res.send("ok")
})
module.exports = route
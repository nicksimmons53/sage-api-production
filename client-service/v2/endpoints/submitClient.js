const AWS = require('aws-sdk');
const ejs = require('ejs');
const path = require('path');

// AWS Variables
const SES = new AWS.SES( );

exports.handler = async event => {
    // let email_to = 'nicks@mcsurfacesinc.com';
    // let email_cc = 'nicks@mcsurfacesinc.com';
    let email_to = ['lisak@mcsurfacesinc.com', 'heathera@mcsurfacesinc.com', 'kimn@mcsurfacesinc.com'];    
    let email_cc = ['menec@mcsurfacesinc.com', 'nicks@mcsurfacesinc.com'];
    let email_from = 'donotreply@mcsurfacesinc.com';

    // Data Representation Variables
    let emailTemplate = path.join(__dirname, '../common/Templates/Client.ejs');
    let tileEmailTemp = path.join(__dirname, '../common/Templates/TileProgram.ejs');
    let countertopEmailTemp = path.join(__dirname, '../common/Templates/CountertopProgram.ejs');
    let woodEmailTemp = path.join(__dirname, '../common/Templates/WoodProgram.ejs');
    let carpetEmailTemp = path.join(__dirname, '../common/Templates/CarpetProgram.ejs');
    let cabinetEmailTemp = path.join(__dirname, '../common/Templates/CabinetProgram.ejs');
    let { 
        client, 
        parts, 
        tileProgramInfo,
        woodProgramInfo,
        carpetProgramInfo,
        countertopProgramInfo,
        cabinetProgramInfo, 
        advancedInfo, 
        contacts 
    } = JSON.parse(event.body);

    // Clean up boolean values in advanced info 
    if (advancedInfo !== undefined) {
        Object.keys(advancedInfo).forEach((key) => {
            advancedInfo[key] = boolSwitch(advancedInfo[key]);
        });
    }

    // Clean up boolean values in tile program
    let programs = [
        { info: tileProgramInfo, html: null, template: tileEmailTemp },
        { info: countertopProgramInfo, html: null, template: countertopEmailTemp },
        { info: cabinetProgramInfo, html: null, template: woodEmailTemp },
        { info: carpetProgramInfo, html: null, template: carpetEmailTemp },
        { info: woodProgramInfo, html: null, template: cabinetEmailTemp }
    ];

    programs.map(async (program, index) => {
        if (program.info !== undefined) {
            Object.keys(program.info).forEach((key) => {
                program.info[key] = boolSwitch(program.info[key]);
            });
            
            program.html = await ejs.renderFile(program.template, {
                client: client,
                program: program.info
            });
        }
    });

    // Render data into HTML file
    let generalInfoHTML = await ejs.renderFile(emailTemplate, { 
        client: client, 
        parts: parts, 
        advancedInfo: advancedInfo, 
        contacts: contacts 
    });

    // Raw Email Content
    var ses_mail = "From: 'MC Surfaces' <" + email_from + ">\n";
    // ses_mail = ses_mail + "To: nicks@mcsurfacesinc.com" + "\n";
    ses_mail = ses_mail + "To: lisak@mcsurfacesinc.com, heathera@mcsurfacesinc.com, kimn@mcsurfacesinc.com" + "\n";
    ses_mail = ses_mail + "Cc: nicks@mcsurfacesinc.com, menec@mcsurfacesinc.com" + "\n";
    ses_mail = ses_mail + "Subject: " + client.clnnme + " - New Client Information Review\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "Please follow the attachment to review the submitted client. Thank you!\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}.html\"\n\n`;
    ses_mail = ses_mail + generalInfoHTML.toString('base64') + "\n\n";
    if (programs[0].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}-TileProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[0].html.toString('base64') + "\n"
    }
    if (programs[1].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}-CountertopProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[1].html.toString('base64') + "\n"
    }
    if (programs[2].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}-CabinetProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[2].html.toString('base64') + "\n"
    }
    if (programs[3].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}-CarpetProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[3].html.toString('base64') + "\n"
    }
    if (programs[4].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${client.clnnme}-WoodProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[4].html.toString('base64') + "\n"
    }
    ses_mail = ses_mail + "--NextPart--";

    // Params for SES raw email
    var params = {
        RawMessage: { Data: Buffer.from(ses_mail) },
        // Destinations: ["nicks@mcsurfacesinc.com"],
        Destinations: ["nicks@mcsurfacesinc.com", "menec@mcsurfacesinc.com", "lisak@mcsurfacesinc.com", "heathera@mcsurfacesinc.com", "kimn@mcsurfacesinc.com"],
        Source: "'AWS Tutorial Series' <" + email_from + ">'"
    };

    try {
        await SES.sendRawEmail(params).promise( );
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200
        };
    } catch(error) {
        console.log(error);
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400
        };
    }
}

// Function to Properly Display Boolean Values
const boolSwitch = (value) => {
    switch(value) {
        case null:
            return '';
        case 0:
            return "No";
        case 1:
            return "Yes";
        default: 
            return value;
    }
}
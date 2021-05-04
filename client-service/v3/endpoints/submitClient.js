const AWS = require('aws-sdk');
const ejs = require('ejs');
const path = require('path');

// AWS Variables
const SES = new AWS.SES( );

exports.handler = async event => {
    // let email_to = ['nicks@mcsurfacesinc.com'];
    // let email_cc = ['nicks@mcsurfacesinc.com'];
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
    let tilePartEmailTemp = path.join(__dirname, '../common/Templates/TileParts.ejs');
    let woodPartEmailTemp = path.join(__dirname, '../common/Templates/WoodParts.ejs');
    let carpetPartEmailTemp = path.join(__dirname, '../common/Templates/CarpetParts.ejs');
    let vinylPartEmailTemp = path.join(__dirname, '../common/Templates/VinylParts.ejs');
    let countertopPartEmailTemp = path.join(__dirname, '../common/Templates/CountertopParts.ejs');
    let requestData = JSON.parse(event.body);

    console.log(requestData);

    // Clean up boolean values in advanced info 
    if (requestData.advancedInfo !== undefined) {
        Object.keys(requestData.advancedInfo).forEach((key) => {
            requestData.advancedInfo[key] = boolSwitch(requestData.advancedInfo[key]);
        });
    }

    // Clean up boolean values in tile program
    let programs = [
        { info: requestData.tileProgramInfo, html: null, template: tileEmailTemp },
        { info: requestData.countertopProgramInfo, html: null, template: countertopEmailTemp },
        { info: requestData.woodProgramInfo, html: null, template: woodEmailTemp },
        { info: requestData.carpetProgramInfo, html: null, template: carpetEmailTemp },
        { info: requestData.cabinetProgramInfo, html: null, template: cabinetEmailTemp }
    ];

    programs.map(async (program, index) => {
        if (program.info !== undefined) {
            Object.keys(program.info).forEach((key) => {
                program.info[key] = boolSwitch(program.info[key]);
            });
            
            program.html = await ejs.renderFile(program.template, {
                client: requestData.client,
                program: program.info
            });
        }
    });

    // Render Billing Parts into EJS Files
    let tilePartsHtml = null;
    let tilePartsTables = requestData.program.tile;

    console.log(tilePartsTables);
    
    tilePartsHtml = await ejs.renderFile(tilePartEmailTemp, {
        floorTile: tilePartsTables.floorTile,
        bathroomWallTile: tilePartsTables.bathroomWallTile,
        backsplashWallTile: tilePartsTables.backsplashWallTile,
        fireplaceWallTile: tilePartsTables.fireplaceWallTile,
        floorStone: tilePartsTables.floorStone,
        bathroomWallStone: tilePartsTables.bathroomWallStone,
        backsplashWallStone: tilePartsTables.backsplashWallStone,
        fireplaceWallStone: tilePartsTables.fireplaceWallStone,
        showerPansStone: tilePartsTables.showerPansStone,
        showerPansTile: tilePartsTables.showerPansTile,
        showerPansDeco: tilePartsTables.showerPansDeco,
        underlayment: tilePartsTables.underlayment,
        patternCharges: tilePartsTables.patternCharges,
        accents: tilePartsTables.accents,
        showerSeats: tilePartsTables.showerSeats,
        addOns: tilePartsTables.addOns
    });

    let woodPartsHtml = null;
    let woodPartsTables = requestData.program.wood;

    console.log(woodPartsTables);
    
    woodPartsHtml = await ejs.renderFile(woodPartEmailTemp, {
        woodFlooring: woodPartsTables.woodFlooring,
        underlayment: tilePartsTables.underlayment
    });

    // Render Billing Parts into EJS Files
    let carpetPartsHtml = null;
    let carpetPartsTables = requestData.program.carpet;

    console.log(carpetPartsTables);
    
    carpetPartsHtml = await ejs.renderFile(carpetPartEmailTemp, {
        carpetFlooring: carpetPartsTables.carpetFlooring,
        carpetPad: carpetPartsTables.carpetPad
    });

    // Render Billing Parts into EJS Files
    let vinylPartsHtml = null;
    let vinylPartsTables = requestData.program.vinyl;

    console.log(vinylPartsTables);
    
    vinylPartsHtml = await ejs.renderFile(vinylPartEmailTemp, {
        vinylPlank: vinylPartsTables.vinylPlank,
        vinylSheet: vinylPartsTables.vinylSheet
    });

    // Render Billing Parts into EJS Files
    let countertopPartsHtml = null;
    let countertopPartsTables = requestData.program.countertops;

    console.log(countertopPartsTables);
    
    countertopPartsHtml = await ejs.renderFile(countertopPartEmailTemp, {
        edges: countertopPartsTables.edges,
        sinks: countertopPartsTables.sinks,
        level1: countertopPartsTables.level1,
        level2: countertopPartsTables.level2,
        level3: countertopPartsTables.level3,
        level4: countertopPartsTables.level4,
        level5: countertopPartsTables.level5,
        level6: countertopPartsTables.level6,
        level7: countertopPartsTables.level7,
        level8: countertopPartsTables.level8,
        level9: countertopPartsTables.level9,
        level10: countertopPartsTables.level10,
    });

    // Render data into HTML file
    let generalInfoHTML = await ejs.renderFile(emailTemplate, { 
        client: requestData.client, 
        parts: requestData.parts, 
        advancedInfo: requestData.advancedInfo, 
        contacts: requestData.contacts 
    });

    // Raw Email Content
    var ses_mail = "From: 'MC Surfaces' <" + email_from + ">\n";
    // ses_mail = ses_mail + "To: nicks@mcsurfacesinc.com" + "\n";
    ses_mail = ses_mail + "To: " + email_to.join(', ') + "\n";
    ses_mail = ses_mail + "Cc: " + email_cc.join(', ') + "\n";
    ses_mail = ses_mail + "Subject: " + requestData.client.clnnme + " - New Client Information Review\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + "Please follow the attachment to review the submitted " + requestData.client.clnnme + " Thank you!\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}.html\"\n\n`;
    ses_mail = ses_mail + generalInfoHTML.toString('base64') + "\n\n";
    if (programs[0].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}-TileProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[0].html.toString('base64') + "\n"
    }
    if (programs[1].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}-CountertopProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[1].html.toString('base64') + "\n"
    }
    if (programs[2].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}-CabinetProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[2].html.toString('base64') + "\n"
    }
    if (programs[3].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}-CarpetProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[3].html.toString('base64') + "\n"
    }
    if (programs[4].html !== null) {
        ses_mail = ses_mail + "--NextPart\n";
        ses_mail = ses_mail + "Content-Type: text/html;\n";
        ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"${requestData.client.clnnme}-WoodProgram.html\"\n\n`;
        ses_mail = ses_mail + programs[4].html.toString('base64') + "\n"
    }
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"TileBillingParts.html\"\n\n`;
    ses_mail = ses_mail + tilePartsHtml.toString('base64') + "\n"
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"WoodBillingParts.html\"\n\n`;
    ses_mail = ses_mail + woodPartsHtml.toString('base64') + "\n"
    ses_mail = ses_mail + "--NextPart--";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"CarpetBillingParts.html\"\n\n`;
    ses_mail = ses_mail + carpetPartsHtml.toString('base64') + "\n"
    ses_mail = ses_mail + "--NextPart--";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"VinylBillingParts.html\"\n\n`;
    ses_mail = ses_mail + vinylPartsHtml.toString('base64') + "\n"
    ses_mail = ses_mail + "--NextPart--";
    ses_mail = ses_mail + "Content-Type: text/html;\n";
    ses_mail = ses_mail + `Content-Disposition: attachment; filename=\"CountertopBillingParts.html\"\n\n`;
    ses_mail = ses_mail + countertopPartsHtml.toString('base64') + "\n"
    ses_mail = ses_mail + "--NextPart--";

    // Params for SES raw email
    var params = {
        RawMessage: { Data: Buffer.from(ses_mail) },
        Destinations: email_to.concat(email_cc),
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
const xml = (client) => {
    Object.keys(client).map((value) => {
        if (client[value] === null) {
            client[value] = "";
        }
    });

let xmlString = 
`<api:MBXML xmlns:api="http://sage100contractor.com/api">
<MBXMLSessionRq>
<Company>MCS INC</Company>
<User>nicks</User>
</MBXMLSessionRq>
<MBXMLMsgsRq messageSetID="1" onError="continueOnError">
<ClientAddNextRq requestID="1">
<ObjectRef>
<ObjectID>
<!--Numeric [0 - 9999999999] :: required field-->
</ObjectID>
</ObjectRef>
<ShortName>
<!--Character [15] :: required field-->
${client.shtnme}
</ShortName>
<Name>
<!--Character [30] :: required field-->
${client.clnnme}
</Name>
<Greeting>
<!--Character [30]-->
${client.grting}
</Greeting>
<Addr1>
<!--Character [30]-->
${client.addrs1}
</Addr1>
<Addr2>
<!--Character [30]-->
${client.addrs2}
</Addr2>
<City>
<!--Character [25]-->
${client.ctynme}
</City>
<State>
<!--State-->
${client.state_}
</State>
<PostalCode>
<!--Zip-->
${client.zipcde}
</PostalCode>
<BillingAddr1>
<!--Character [30]-->
${client.bilad1}
</BillingAddr1>
<BillingAddr2>
<!--Character [30]-->
${client.bilad2}
</BillingAddr2>
<BillingCity>
<!--Character [25]-->
${client.bilcty}
</BillingCity>
<BillingState>
<!--State-->
${client.bilste}
</BillingState>
<BillingPostalCode>
<!--Zip-->
${client.bilzip}
</BillingPostalCode>
<ShippingAddr1>
<!--Character [30]-->
${client.shpad1}
</ShippingAddr1>
<ShippingAddr2>
<!--Character [30]-->
${client.shpad2}
</ShippingAddr2>
<ShippingCity>
<!--Character [25]-->
${client.shpcty}
</ShippingCity>
<ShippingState>
<!--State-->
${client.shpste}
</ShippingState>
<ShippingPostalCode>
<!--Zip-->
${client.shpzip}
</ShippingPostalCode>
<ContactedDate>
<!--Date-->
${client.lstctc}
</ContactedDate>
<ClientStatusRef>
<ObjectID>
<!--Numeric [0 - 9999999999] :: required field-->
1
</ObjectID>
</ClientStatusRef>
<Memo>
<!--Memo-->
${client.ntetxt}
</Memo>
<ClientContactAdd>            
<ContactName>
<!--Character [50]-->
${client.contct}
</ContactName>
<JobTitle>
<!--Character [50]-->
${client.cntds1}
</JobTitle>
<Phone>
<!--Phone Number-->
${client.phnnum}
</Phone>
<Extension>
<!--Character [6]-->
${client.phnext}
</Extension>
<Email>
<!--Character [75]-->
${client.e_mail}
</Email>
<Mobile>
<!--Phone Number-->
${client.cllphn}
</Mobile>
<OtherPhone>
<!--Phone Number-->
</OtherPhone>
<OtherDesc>
<!--Character [25]-->
</OtherDesc>
<Memo>
<!--Memo-->
</Memo>
</ClientContactAdd>	
<ClientContactAdd>            
<ContactName>
<!--Character [50]-->
${client.contc2}
</ContactName>
<JobTitle>
<!--Character [50]-->
${client.cntds2}
</JobTitle>
<Phone>
<!--Phone Number-->
${client.phn002}
</Phone>
<Extension>
<!--Character [6]-->
${client.phext2}
</Extension>
<Email>
<!--Character [75]-->
${client.email2}
</Email>
<Mobile>
<!--Phone Number-->
${client.cell02}
</Mobile>
<OtherPhone>
<!--Phone Number-->
</OtherPhone>
<OtherDesc>
<!--Character [25]-->
</OtherDesc>
<Memo>
<!--Memo-->
</Memo>
</ClientContactAdd>	
<ClientContactAdd>            
<ContactName>
<!--Character [50]-->
${client.contc3}
</ContactName>
<JobTitle>
<!--Character [50]-->
${client.cntds3}
</JobTitle>
<Phone>
<!--Phone Number-->
${client.phn003}
</Phone>
<Extension>
<!--Character [6]-->
${client.phext3}
</Extension>
<Email>
<!--Character [75]-->
${client.email3}
</Email>
<Mobile>
<!--Phone Number-->
${client.cell03}
</Mobile>
<OtherPhone>
<!--Phone Number-->
</OtherPhone>
<OtherDesc>
<!--Character [25]-->
</OtherDesc>
<Memo>
<!--Memo-->
</Memo>
</ClientContactAdd>	
</ClientAddNextRq>
</MBXMLMsgsRq>
</api:MBXML>`;

    xmlString = xmlString.replace(/[\n\r]/g, "");

    return xmlString;
}

exports.xml = xml;
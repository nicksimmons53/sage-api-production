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
<UserDefined1>
<!--Character [30]-->
${client.usrdf1}
</UserDefined1>
<UserDefined2>
<!--Character [30]-->
${client.usrdf2}
</UserDefined2>
<UserDefined3>
<!--Character [30]-->
${client.usrdf3}
</UserDefined3>
<UserDefined4>
<!--Character [30]-->
${client.usrdf4}
</UserDefined4>
<UserDefined5>
<!--Character [30]-->
${client.usrdf5}
</UserDefined5>
<UserDefined6Logical>
<!--Numeric [0 - 1]-->
${client.usrdf6}
</UserDefined6Logical>
<UserDefined7Logical>
<!--Numeric [0 - 1]-->
${client.usrdf7}
</UserDefined7Logical>
<UserDefined8Logical>
<!--Numeric [0 - 1]-->
${client.usrdf8}
</UserDefined8Logical>
<UserDefined9Logical>
<!--Numeric [0 - 1]-->
${client.usrdf9}
</UserDefined9Logical>
<ContactedDate>
<!--Date-->
${client.lstctc}
</ContactedDate>
<CallbackDate>
<!--Date-->
${client.cllbck}
</CallbackDate>
<MailPiece>
<!--Character [12]-->
${client.lstmal}
</MailPiece>
<MailedDate>
<!--Date-->
${client.lstdte}
</MailedDate>
<PurchasedDate>
<!--Date-->
${client.pchdte}
</PurchasedDate>
<ReferenceDate>
<!--Date-->
${client.refdte}
</ReferenceDate>
<DueTerm>
<!--Character-->
${client.duetrm}
</DueTerm>
<FinanceRate>
<!--Numeric [0 - 99]-->
${client.finrte}
</FinanceRate>
<ClientStatusRef>
<ObjectID>
<!--Numeric [0 - 9999999999] :: required field-->
1
</ObjectID>
</ClientStatusRef>
<ExpirationDate>
<!--Date-->
${client.srvexp}
</ExpirationDate>
<DiscountRate>
<!--Numeric [-99 - 999]-->
${client.clndsc}
</DiscountRate>
<MapLocation>
<!--Character [10]-->
${client.maploc}
</MapLocation>
<CrossStreet>
<!--Character [30]-->
${client.crsstr}
</CrossStreet>
<PartBillingBasis>
<!--Numeric [1 - 3]-->
${client.bilbas}
</PartBillingBasis>
<PurchaseOrderNumber>
<!--Character [15]-->
${client.pchnum}
</PurchaseOrderNumber>
<TaxExemptionNumber>
<!--Character [15]-->
${client.exmnum}
</TaxExemptionNumber>
<CreditCardNumber>
<!--Character [20]-->
${client.crdnum}
</CreditCardNumber>
<CreditCardExpirationDate>
<!--Date-->
${client.expdte}
</CreditCardExpirationDate>
<CreditCardCarhdholder>
<!--Character [30]-->
${client.crdnme}
</CreditCardCarhdholder>
<CreditCardType>
<!--Character [30]-->
${client.crdtyp}
</CreditCardType>
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
<Fax>
<!--Phone Number-->
${client.faxnum}
</Fax>
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
<Fax>
<!--Phone Number-->
${client.fax002}
</Fax>
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
<Fax>
<!--Phone Number-->
${client.fax003}
</Fax>
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
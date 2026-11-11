
import smtplib, random, time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

#e.g. emailSender("this is subject", "c@case.edu", "a@gmail.com, b@gmail.com", "this is the body")
def emailSender(s, f, t, b):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = s
    msg['From'] = f
    msg['To'] = t

    msg.attach(MIMEText(b, 'html'))
    try:
        s = smtplib.SMTP('smtp.case.edu')
        s.send_message(msg)
        s.quit()
        print ("email success")
    except:
        print ("email error")

HARLDTitle = "[HARLD] You've received a time-sensitive package! (PK119{})".format(random.randint(5374, 9999))
HARLDFrom1 = "NRV Area Office (Wade Commons) <nrvareaoffice@case.edu>"
HARLDFrom = "SRV Area Office (Fribley Commons) <srvareaoffice@case.edu>"


HTML = """\
<div id=":z4" class="ii gt"><div id=":z3" class="a3s aXjCH "><p>
          You have a package waiting at NRV Area Office (Wade Commons)!
        
      Bring your CaseOneCard to the office to pick it up. Refrigerate immediately!
        </p><p>Here are some details:</p><table><tbody><tr><th align="right">Type:</th><td>Tupperware - Large</td></tr><tr><th align="right">Delivery Date:</th><td>4/30/2019 1:03:00 PM</td></tr><tr><th align="right">Carrier:</th><td>FedEx Ground/Home</td></tr><tr><th align="right">Origin:</th><td>United States</td></tr></tbody></table><p>
            You can always access your waiting packages and mail in your <a href="https://housing.case.edu/myhousing" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://housing.case.edu/myhousing&amp;source=gmail&amp;ust=1556572666256000&amp;usg=AFQjCNEnT7EAaMMzLIzbd-D1kqH2GQ3cwg">myHousing</a>.
        </p><hr style="color:#626262;background-color:#626262" color="#626262"><table><tbody><tr><td style="font-size:0.85em;font-family:sans-serif"><a href="https://students.case.edu/living/" style="text-decoration:none;color:#0a304e" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://students.case.edu/living/&amp;source=gmail&amp;ust=1556572666256000&amp;usg=AFQjCNFTBkeV599BuzwJGwqzoQ9dKr5sag">Office of University Housing</a><br><a href="mailto:housing@case.edu" style="text-decoration:none;color:#626262" target="_blank">housing@case.edu</a><br><a href="tel:2163683780" style="text-decoration:none;color:#626262" target="_blank">216.368.3780</a></td><td style="padding-left:40px"><a href="https://www.case.edu/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.case.edu/&amp;source=gmail&amp;ust=1556572666257000&amp;usg=AFQjCNF0ffK1L56zRmdfMHP-hEBcYjZIIw"><img src="https://ci3.googleusercontent.com/proxy/kXPy5xHsNux5F-XAryD8jy3PwTY8bFUiriZrXl-nJ9VbJbvyax7mvla0A9QQCzplbBJzGhNy7Dl63YdRUiiUgPbhNZPso7BhV9VjTP8nRA=s0-d-e1-ft#https://students.case.edu/Public/Branding/HarldEmailLogo.png" width="250" height="60" alt="Case Western Reserve University logo" class="CToWUd"></a></td></tr></tbody></table><div class="yj6qo"></div><div class="adL">

</div></div></div>
"""

HTML1 = """\
<div id=":z4" class="ii gt"><div id=":z3" class="a3s aXjCH "><p>
          You have a package waiting at SRV Area Office (Fribley Commons)!
        
      Bring your CaseOneCard to the office to pick it up.
        </p><p>Here are some details:</p><table><tbody><tr><th align="right">Type:</th><td>Pouch - Smol</td></tr><tr><th align="right">Delivery Date:</th><td>4/27/2019 2:24:00 PM</td></tr><tr><th align="right">Carrier:</th><td>FedEx Ground/Home</td></tr><tr><th align="right">Origin:</th><td>United States</td></tr></tbody></table><p>
            You can always access your waiting packages and mail in your <a href="https://housing.case.edu/myhousing" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://housing.case.edu/myhousing&amp;source=gmail&amp;ust=1556572666256000&amp;usg=AFQjCNEnT7EAaMMzLIzbd-D1kqH2GQ3cwg">myHousing</a>.
        </p><hr style="color:#626262;background-color:#626262" color="#626262"><table><tbody><tr><td style="font-size:0.85em;font-family:sans-serif"><a href="https://students.case.edu/living/" style="text-decoration:none;color:#0a304e" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://students.case.edu/living/&amp;source=gmail&amp;ust=1556572666256000&amp;usg=AFQjCNFTBkeV599BuzwJGwqzoQ9dKr5sag">Office of University Housing</a><br><a href="mailto:housing@case.edu" style="text-decoration:none;color:#626262" target="_blank">housing@case.edu</a><br><a href="tel:2163683780" style="text-decoration:none;color:#626262" target="_blank">216.368.3780</a></td><td style="padding-left:40px"><a href="https://www.case.edu/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.case.edu/&amp;source=gmail&amp;ust=1556572666257000&amp;usg=AFQjCNF0ffK1L56zRmdfMHP-hEBcYjZIIw"><img src="https://ci3.googleusercontent.com/proxy/kXPy5xHsNux5F-XAryD8jy3PwTY8bFUiriZrXl-nJ9VbJbvyax7mvla0A9QQCzplbBJzGhNy7Dl63YdRUiiUgPbhNZPso7BhV9VjTP8nRA=s0-d-e1-ft#https://students.case.edu/Public/Branding/HarldEmailLogo.png" width="250" height="60" alt="Case Western Reserve University logo" class="CToWUd"></a></td></tr></tbody></table><div class="yj6qo"></div><div class="adL">

</div></div></div>
"""

body = """\
<div id=":z4" class="ii gt"><div id=":z3" class="a3s aXjCH "><p>
          Congratulations! You have succcessfully registered pounder@case.edu!
        
        </p><p>Here are some details:</p><table><tbody><tr><th align="right">
        Type:</th><td>Email Domain</td></tr><tr><th align="right">
        Date:</th><td> 5/3/2019 4:24:00 PM</td></tr><tr></tbody></table><hr style="color:#626262;background-color:#626262" color="#626262"><table><tbody><tr><td style="font-size:0.85em;font-family:sans-serif"><a href="https://students.case.edu/living/" style="text-decoration:none;color:#0a304e" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://students.case.edu/living/&amp;source=gmail&amp;ust=1556572666256000&amp;usg=AFQjCNFTBkeV599BuzwJGwqzoQ9dKr5sag">
        UTech</a><br><a href="mailto:housing@case.edu" style="text-decoration:none;color:#626262" target="_blank">utech@case.edu</a><br><a href="tel:2163683780" style="text-decoration:none;color:#626262" target="_blank">216.368.3780</a></td><td style="padding-left:40px"><a href="https://www.case.edu/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.case.edu/&amp;source=gmail&amp;ust=1556572666257000&amp;usg=AFQjCNF0ffK1L56zRmdfMHP-hEBcYjZIIw"><img src="https://ci3.googleusercontent.com/proxy/kXPy5xHsNux5F-XAryD8jy3PwTY8bFUiriZrXl-nJ9VbJbvyax7mvla0A9QQCzplbBJzGhNy7Dl63YdRUiiUgPbhNZPso7BhV9VjTP8nRA=s0-d-e1-ft#https://students.case.edu/Public/Branding/HarldEmailLogo.png" width="250" height="60" alt="Case Western Reserve University logo" class="CToWUd"></a></td></tr></tbody></table><div class="yj6qo"></div><div class="adL">

</div></div></div>
"""

def main():
    target = ""
    # emailSender(HARLDTitle, HARLDFrom1, target, HTML)
    # emailSender("bro are you alright", "Barbara R. Snyder <<REDACTED>@case.edu>", target, "Wait Mark, are you alright")
   # emailSender(HARLDTitle, HARLDFrom, target, HTML)


    # while true:
    #     emailSender(HARLDTitle, HARLDFrom, target, HTML)
    #     time.sleep(3600)


if __name__ == '__main__':main()

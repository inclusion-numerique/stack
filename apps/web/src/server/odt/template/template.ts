/**
 * Contents from a basic odt file template (versionned in template/ directory)
 */
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const MetaInfManifestXml = `<?xml version="1.0" encoding="UTF-8"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
    <manifest:file-entry manifest:media-type="application/vnd.oasis.opendocument.text" manifest:version="1.2"
                         manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="text/xml" manifest:full-path="content.xml"/>
    <manifest:file-entry manifest:media-type="application/rdf+xml" manifest:full-path="manifest.rdf"/>
    <manifest:file-entry manifest:media-type="text/xml" manifest:full-path="styles.xml"/>
    <manifest:file-entry manifest:media-type="text/xml" manifest:full-path="meta.xml"/>
</manifest:manifest>
`

export const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-content xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                         xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
                         xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
                         xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
                         xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
                         xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
                         xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
                         xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0"
                         xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0"
                         xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0"
                         xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0"
                         xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"
                         xmlns:field="urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0"
                         office:version="1.2">
    <office:scripts/>
    <office:font-face-decls>
        <style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;"
                         style:font-family-generic="roman" style:font-pitch="variable"/>
        <style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Arial Unicode MS" svg:font-family="&apos;Arial Unicode MS&apos;"
                         style:font-family-generic="system" style:font-pitch="variable"/>
    </office:font-face-decls>
    <office:automatic-styles>
        <style:style style:name="P1" style:family="paragraph" style:parent-style-name="Standard">
            <style:paragraph-properties fo:text-align="start" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="11pt" style:font-size-asian="11pt"
                                   style:font-size-complex="11pt"/>
        </style:style>
        <style:style style:name="P2" style:family="paragraph" style:parent-style-name="Standard">
            <style:paragraph-properties fo:text-align="center" style:justify-single-word="false"/>
            <style:text-properties style:font-name="Arial" fo:font-size="36pt" style:font-size-asian="36pt"
                                   style:font-size-complex="36pt"/>
        </style:style>
    </office:automatic-styles>
    <office:body>
        <office:text>
            <text:sequence-decls>
                <text:sequence-decl text:display-outline-level="0" text:name="Illustration"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Table"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Text"/>
                <text:sequence-decl text:display-outline-level="0" text:name="Drawing"/>
            </text:sequence-decls>
            <text:p text:style-name="P2">Test</text:p>
            <text:p text:style-name="P1"/>
            <text:p text:style-name="P1"/>
            <text:p text:style-name="P1">Un texte d&apos;exemple</text:p>
        </office:text>
    </office:body>
</office:document-content>
`

export const manifestRdf = `<?xml version="1.0" encoding="utf-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about="styles.xml">
    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/odf#StylesFile"/>
  </rdf:Description>
  <rdf:Description rdf:about="">
    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="styles.xml"/>
  </rdf:Description>
  <rdf:Description rdf:about="content.xml">
    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/odf#ContentFile"/>
  </rdf:Description>
  <rdf:Description rdf:about="">
    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="content.xml"/>
  </rdf:Description>
  <rdf:Description rdf:about="">
    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#Document"/>
  </rdf:Description>
</rdf:RDF>
`

export const metaXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                      xmlns:dc="http://purl.org/dc/elements/1.1/"
                      xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
                      office:version="1.2">
    <office:meta>
        <meta:initial-creator>${PublicWebAppConfig.projectTitle}</meta:initial-creator>
        <dc:creator>${PublicWebAppConfig.projectTitle}</dc:creator>
    </office:meta>
</office:document-meta>
`

export const mimeType = 'application/vnd.oasis.opendocument.text'

export const stylesXml = `<?xml version="1.0" encoding="UTF-8"?>
<office:document-styles xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"
                        xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"
                        xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"
                        xmlns:table="urn:oasis:names:tc:opendocument:xmlns:table:1.0"
                        xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"
                        xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"
                        xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"
                        xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"
                        xmlns:chart="urn:oasis:names:tc:opendocument:xmlns:chart:1.0"
                        xmlns:dr3d="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0"
                        xmlns:form="urn:oasis:names:tc:opendocument:xmlns:form:1.0"
                        xmlns:script="urn:oasis:names:tc:opendocument:xmlns:script:1.0"
                        xmlns:of="urn:oasis:names:tc:opendocument:xmlns:of:1.2"
                        office:version="1.2">
    <office:font-face-decls>
        <style:font-face style:name="Times New Roman" svg:font-family="&apos;Times New Roman&apos;"
                         style:font-family-generic="roman" style:font-pitch="variable"/>
        <style:font-face style:name="Arial" svg:font-family="Arial" style:font-family-generic="swiss"
                         style:font-pitch="variable"/>
        <style:font-face style:name="Arial Unicode MS" svg:font-family="&apos;Arial Unicode MS&apos;"
                         style:font-family-generic="system" style:font-pitch="variable"/>
    </office:font-face-decls>
    <office:styles>
        <style:default-style style:family="graphic">
            <style:graphic-properties fo:wrap-option="no-wrap" draw:shadow-offset-x="0.1181in"
                                      draw:shadow-offset-y="0.1181in" draw:start-line-spacing-horizontal="0.1114in"
                                      draw:start-line-spacing-vertical="0.1114in"
                                      draw:end-line-spacing-horizontal="0.1114in"
                                      draw:end-line-spacing-vertical="0.1114in" style:flow-with-text="false"/>
            <style:paragraph-properties style:text-autospace="ideograph-alpha" style:line-break="strict"
                                        style:writing-mode="lr-tb" style:font-independent-line-spacing="false">
                <style:tab-stops/>
            </style:paragraph-properties>
            <style:text-properties style:use-window-font-color="true" fo:font-size="12pt" fo:language="en"
                                   fo:country="none" style:letter-kerning="true" style:font-size-asian="12pt"
                                   style:language-asian="zh" style:country-asian="CN" style:font-size-complex="12pt"
                                   style:language-complex="hi" style:country-complex="IN"/>
        </style:default-style>
        <style:default-style style:family="paragraph">
            <style:paragraph-properties fo:hyphenation-ladder-count="no-limit" style:text-autospace="ideograph-alpha"
                                        style:punctuation-wrap="hanging" style:line-break="strict"
                                        style:tab-stop-distance="0.4925in" style:writing-mode="page"/>
            <style:text-properties style:use-window-font-color="true" style:font-name="Times New Roman"
                                   fo:font-size="12pt" fo:language="en" fo:country="none" style:letter-kerning="true"
                                   style:font-name-asian="Arial Unicode MS" style:font-size-asian="12pt"
                                   style:language-asian="zh" style:country-asian="CN"
                                   style:font-name-complex="Arial Unicode MS" style:font-size-complex="12pt"
                                   style:language-complex="hi" style:country-complex="IN" fo:hyphenate="false"
                                   fo:hyphenation-remain-char-count="2" fo:hyphenation-push-char-count="2"/>
        </style:default-style>
        <style:default-style style:family="table">
            <style:table-properties table:border-model="collapsing"/>
        </style:default-style>
        <style:default-style style:family="table-row">
            <style:table-row-properties fo:keep-together="auto"/>
        </style:default-style>
        <style:style style:name="Standard" style:family="paragraph" style:class="text"/>
        <style:style style:name="Heading" style:family="paragraph" style:parent-style-name="Standard"
                     style:next-style-name="Text_20_body" style:class="text">
            <style:paragraph-properties fo:margin-top="0.1665in" fo:margin-bottom="0.0835in"
                                        fo:keep-with-next="always"/>
            <style:text-properties style:font-name="Arial" fo:font-size="14pt" style:font-name-asian="Arial Unicode MS"
                                   style:font-size-asian="14pt" style:font-name-complex="Arial Unicode MS"
                                   style:font-size-complex="14pt"/>
        </style:style>
        <style:style style:name="Text_20_body" style:display-name="Text body" style:family="paragraph"
                     style:parent-style-name="Standard" style:class="text">
            <style:paragraph-properties fo:margin-top="0in" fo:margin-bottom="0.0835in"/>
        </style:style>
        <style:style style:name="List" style:family="paragraph" style:parent-style-name="Text_20_body"
                     style:class="list"/>
        <style:style style:name="Caption" style:family="paragraph" style:parent-style-name="Standard"
                     style:class="extra">
            <style:paragraph-properties fo:margin-top="0.0835in" fo:margin-bottom="0.0835in" text:number-lines="false"
                                        text:line-number="0"/>
            <style:text-properties fo:font-size="12pt" fo:font-style="italic" style:font-size-asian="12pt"
                                   style:font-style-asian="italic" style:font-size-complex="12pt"
                                   style:font-style-complex="italic"/>
        </style:style>
        <style:style style:name="Index" style:family="paragraph" style:parent-style-name="Standard" style:class="index">
            <style:paragraph-properties text:number-lines="false" text:line-number="0"/>
        </style:style>
        <text:outline-style style:name="Outline">
            <text:outline-level-style text:level="1" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.3in" fo:text-indent="-0.3in"
                                                      fo:margin-left="0.3in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="2" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.4in" fo:text-indent="-0.4in"
                                                      fo:margin-left="0.4in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="3" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.5in" fo:text-indent="-0.5in"
                                                      fo:margin-left="0.5in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="4" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.6in" fo:text-indent="-0.6in"
                                                      fo:margin-left="0.6in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="5" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.7in" fo:text-indent="-0.7in"
                                                      fo:margin-left="0.7in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="6" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.8in" fo:text-indent="-0.8in"
                                                      fo:margin-left="0.8in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="7" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="0.9in" fo:text-indent="-0.9in"
                                                      fo:margin-left="0.9in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="8" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab" text:list-tab-stop-position="1in"
                                                      fo:text-indent="-1in" fo:margin-left="1in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="9" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="1.1in" fo:text-indent="-1.1in"
                                                      fo:margin-left="1.1in"/>
                </style:list-level-properties>
            </text:outline-level-style>
            <text:outline-level-style text:level="10" style:num-format="">
                <style:list-level-properties text:list-level-position-and-space-mode="label-alignment">
                    <style:list-level-label-alignment text:label-followed-by="listtab"
                                                      text:list-tab-stop-position="1.2in" fo:text-indent="-1.2in"
                                                      fo:margin-left="1.2in"/>
                </style:list-level-properties>
            </text:outline-level-style>
        </text:outline-style>
        <text:notes-configuration text:note-class="footnote" style:num-format="1" text:start-value="0"
                                  text:footnotes-position="page" text:start-numbering-at="document"/>
        <text:notes-configuration text:note-class="endnote" style:num-format="i" text:start-value="0"/>
        <text:linenumbering-configuration text:number-lines="false" text:offset="0.1965in" style:num-format="1"
                                          text:number-position="left" text:increment="5"/>
    </office:styles>
    <office:automatic-styles>
        <style:page-layout style:name="Mpm1">
            <style:page-layout-properties fo:page-width="8.2681in" fo:page-height="11.6929in" style:num-format="1"
                                          style:print-orientation="portrait" fo:margin-top="0.7874in"
                                          fo:margin-bottom="0.7874in" fo:margin-left="0.7874in"
                                          fo:margin-right="0.7874in" style:writing-mode="lr-tb"
                                          style:footnote-max-height="0in">
                <style:footnote-sep style:width="0.0071in" style:distance-before-sep="0.0398in"
                                    style:distance-after-sep="0.0398in" style:adjustment="left" style:rel-width="25%"
                                    style:color="#000000"/>
            </style:page-layout-properties>
            <style:header-style/>
            <style:footer-style/>
        </style:page-layout>
    </office:automatic-styles>
    <office:master-styles>
        <style:master-page style:name="Standard" style:page-layout-name="Mpm1"/>
    </office:master-styles>
</office:document-styles>
`

---
title: 'Accessing INEGI Microdata: A Guide for Graduate Students & Researchers'
type: page
url: /inegi/
summary: 'A practical guide for IU researchers: public microdata, remote code processing,
  and in-person laboratory access.'
---

[← Home](/#inegi)

A guide for IU graduate students and IU-affiliated researchers working on Mexico.

## Institutional access & overview

The **Instituto Nacional de Estadística y Geografía (INEGI)**—Mexico’s National Institute of Statistics and Geography—produces economic, social, demographic, and geographic data for research on Mexico.

**Indiana University and INEGI maintain an agreement** that allows IU graduate students and affiliated researchers to request access to restricted microdata for academic research. The agreement provides an institutional route to apply; each project, researcher, and data request remains subject to INEGI approval.

### Choose the right access route

| Access route | How it works | Where you work |
| --- | --- | --- |
| Public microdata | Download the anonymized files made publicly available for a program. | Your own computer. |
| **Remote Processing (*Procesamiento Remoto*)** | **Send code or processing specifications to INEGI. INEGI staff execute them on the restricted data and return approved statistical output after confidentiality review.** | You prepare and submit scripts remotely. You do **not** log into the confidential data or an INEGI desktop from home or IU. |
| **Microdata Laboratory (*Laboratorio de Microdatos*)** | You analyze approved microdata using INEGI’s secure equipment after accreditation, registration, and training. | **Physical attendance at an authorized laboratory**, including the Mexico City facilities described below. Direct access to the secure desktop is permitted only inside the laboratory. |

The distinction between remote processing and on-site access is set out in Articles 19 and 31 of the [INEGI operating rules (Spanish PDF)](https://sc.inegi.org.mx/repositorioNormateca/Rod_19Jul22.pdf). Access through an institutional agreement does not create off-site access to the secure desktop.

## INEGI data products

INEGI’s programs cover a wide range of research topics. Availability, geographic detail, years, and access conditions vary by program; inclusion here does not guarantee that a particular variable or confidential file can be released or accessed.

| Program or data family | Research uses |
| --- | --- |
| **Economic Censuses (*Censos Económicos*)** | Establishment activity, revenue, input costs, employment, capital, and industry. |
| **Population and Housing Censuses (*Censos de Población y Vivienda*)** | Demographics, housing, labor, and socioeconomic characteristics. |
| **Agricultural and forestry censuses (*Censos Agropecuarios y Forestales*)** | Agricultural production, land use, machinery, and the rural economy. Consult the relevant census edition for coverage. |
| **National Survey of Household Income and Expenditure (*Encuesta Nacional de Ingresos y Gastos de los Hogares*, ENIGH)** | Household income, consumption, and expenditure. |
| **National Survey of Occupation and Employment (*Encuesta Nacional de Ocupación y Empleo*, ENOE)** | Employment, informality, earnings, and working conditions. |
| **Environmental and sectoral statistics** | Environmental management and industry-specific activity. Check the program’s questionnaire and metadata for environmental variables; regulatory compliance and emissions records may require a different agency or a separate request. |
| **Geospatial and cartographic data** | Geographic boundaries, digital maps, and spatial layers for GIS analysis. |

Start with the [INEGI website](https://www.inegi.org.mx/) and [program catalogue](https://www.inegi.org.mx/programas/). Public microdata, documentation, and file structures (*Estructura de archivos*, FD) can often be downloaded from the relevant program page. Restricted files require an approved access request. Restricted access does not mean unrestricted access to direct identifiers.

## How to request access

### 1. Define your research and data needs

Identify the programs, years, variables, geographic detail, and outputs your project requires. Explain why publicly available files are insufficient. Discuss the project with your thesis advisor or research supervisor before applying.

### 2. Prepare the documentation package

Download the [INEGI access application form (PDF)](https://www.inegi.org.mx/contenidos/app/microdatos/laboratoriodatos/doc/Solicitud_Uso.pdf). Complete and save it in PDF format using Adobe Acrobat Reader. Prepare the following together for submission to [microdatos@inegi.org.mx](mailto:microdatos@inegi.org.mx):

- **Completed application**, including your project objectives, requested data, intended outputs, and chosen access modality.
- **Institutional affiliation documents** for you and, for graduate students, your thesis advisor or supervisor. Coordinate the IU endorsement with your department’s administrative or research contact and include the applicable approval with your application.
- **Official photo identification** for you and your advisor or supervisor, as applicable; a passport is an appropriate option for international applicants.
- **Updated CVs** for you and your advisor or supervisor, as applicable.
- **Evidence of an eligible scholarship or research-system affiliation**, if relevant to your application, such as SECIHTI or SNII documentation. Ask INEGI which current documentation it accepts.

Send the application materials together in a single email and follow any additional instructions INEGI provides. Requirements for researchers and their supervisors can vary by applicant category; consult the current form and the [operating rules, Articles 7–14](https://sc.inegi.org.mx/repositorioNormateca/Rod_19Jul22.pdf).

### 3A. Remote Processing (*Procesamiento Remoto*)

This route is suitable when you cannot travel to a laboratory and can specify the analysis in code.

1. Send the signed, scanned application PDF to [microdatos@inegi.org.mx](mailto:microdatos@inegi.org.mx), with your advisor’s or supervisor’s signature where required.
2. After INEGI acknowledges the request, provide your variable selection using the relevant program’s file-structure document (*Estructura de archivos*, FD), together with your scripts or processing specifications.
3. Agree on accepted software, file formats, and naming conventions with INEGI. These may include Stata `.do` files or R scripts, depending on the project and available tools.
4. **INEGI staff run the code on the confidential microdata.** Outputs are reviewed for disclosure risk before approved results are returned to you.

Remote processing is a code-submission service, not a remote-desktop connection. Under Article 19 of the linked rules, this modality does not require the laboratory accreditation or signed laboratory terms of use applicable to on-site access.

### 3B. Microdata Laboratory (*Laboratorio de Microdatos*)

This route requires you to travel to an approved facility in Mexico and work there in person.

1. Select your preferred laboratory in the application and confirm availability with INEGI before making travel arrangements.
2. Coordinate institutional accreditation through the IU–INEGI agreement, or another applicable accreditation route identified by INEGI.
3. Submit signed originals of the application and the terms of use (*Términos y Condiciones de Uso*) when instructed. Obtain your advisor’s or supervisor’s signature where required.
4. Complete the required confidentiality and laboratory-orientation training, then reserve your working sessions according to the facility’s procedures.
5. Work on the approved data using the secure laboratory equipment. Confirm required software and versions in advance. Tools may include R, Stata, SPSS, Excel, Mapa Digital, and ArcGIS; availability should be checked for your project and chosen facility.
6. Request review and release of your statistical outputs through INEGI. Confidential microdata remain within the secure environment.

**Direct access is available only while physically present inside an authorized Microdata Laboratory.** For the Mexico City route, confirm a place at Patriotismo or El Colegio de México. All work is subject to the [operating rules (in Spanish)](https://sc.inegi.org.mx/repositorioNormateca/Rod_19Jul22.pdf), the signed terms of use, and the facility’s scheduling arrangements.

### Laboratory locations

| Location | Address |
| --- | --- |
| **Mexico City — Patriotismo** | Av. Patriotismo 711, Torre A, Col. San Juan Mixcoac, Benito Juárez, Ciudad de México. |
| **Mexico City — El Colegio de México** | Carretera Picacho Ajusco 20, Tlalpan, Ciudad de México. |
| **Aguascalientes** | Av. Héroe de Nacozari Sur 2301, Jardines del Parque, Aguascalientes. |

INEGI also operates a facility in Aguascalientes. Ask INEGI which locations can accommodate your approved project and confirm the address and appointment before traveling. See the official announcements for [Aguascalientes](https://intranet.inegi.org.mx/pages/nota_85_23.html) and [El Colegio de México](https://intranet.inegi.org.mx/pages/nota_14_25.html).

## Fees, confidentiality, and project completion

The laboratory service is free under the operating rules. Confirm any charges for separate custom tabulations or special data preparation; those are distinct from the standard access service.

All requested outputs undergo statistical disclosure review before release. Follow INEGI’s current confidentiality guidance and disclosure-control procedures when preparing tables, figures, estimates, and other results.

When the project ends, notify INEGI so it can close the workspace or release resources. Send your thesis, paper, or public URL with the requested metadata to [microdatos@inegi.org.mx](mailto:microdatos@inegi.org.mx). **Confirm any six-month submission deadline in your approval documents or directly with INEGI**; the linked 2022 operating rules require delivery of research outputs but do not specify that as a universal publication deadline.

## Questions or help

**Official applications and access questions:** [microdatos@inegi.org.mx](mailto:microdatos@inegi.org.mx).

If you are an IU student or affiliated researcher and would like to discuss the application process, feel free to [contact me at bseoela@iu.edu](mailto:bseoela@iu.edu). I am happy to share my experience navigating the process. INEGI makes all access and disclosure decisions.

## Official resources

- [INEGI website and data products](https://www.inegi.org.mx/)
- [Microdata access application (PDF)](https://www.inegi.org.mx/contenidos/app/microdatos/laboratoriodatos/doc/Solicitud_Uso.pdf)
- [Reglas de Operación del Laboratorio de Microdatos del INEGI (Spanish PDF)](https://sc.inegi.org.mx/repositorioNormateca/Rod_19Jul22.pdf)

*Guide updated September 28, 2026. Confirm current forms, software, appointments, and requirements with INEGI.*

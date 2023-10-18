import { Router } from 'express'

const routes = Router()

import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Document } from 'langchain/document'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
// import configuration from '~/configuration'
// const fs = require('fs')
import fs from 'fs'
import formidable from 'formidable'
import { promises as fsPromises } from 'fs'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
// const admin = require('firebase-admin')
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
routes.post('/', async (req, res) => {
  try {
    // fixme config
    // const { chunkSize, chunkOverlap } = configuration.engine
    const chunkSize = 1000
    const chunkOverlap = 500
    console.log(
      'inside ingestSinglePDF to supabase. chunkoverlap and chunksize',
      chunkOverlap,
      chunkSize
    )
    // fixme config
    const SUPABASE_PRIVATE_KEY = ''
    const SUPABASE_URL = ''
    // const { SUPABASE_PRIVATE_KEY, SUPABASE_URL } = configuration.engine

    let organizationId, workspaceId, fileSize, fileName

    // const form = new formidable.IncomingForm()

    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     console.error('Error', err)
    //     throw err
    //   }

    //   for (const file of Object.values(files)) {
    //     console.log('🌟here is the file and path', fileds, files, file.path)
    //     let dataBuffer = await fs.promises.readFile(file.path)
    //     let data = await pdfParse(dataBuffer)
    //     console.log('here is the text in formdable data buffer', data.text)
    //   }
    //   for (const file of Object.values(files)) {
    //     let dataBuffer = await fs.promises.readFile(file.path)
    //     let data = await pdfParse(dataBuffer)
    //     console.log('here is the text in formdable data buffer', data.text)

    //     // Extracting the organizationId and workspaceId from the fields
    //     organizationId = fields.organizationId
    //     workspaceId = fields.workspaceId

    //     // Extracting the file size and name
    //     fileSize = file.size
    //     fileName = file.name

    //     // Removing the file after reading it
    //     await fsPromises.unlink(file.path)

    //     // Logging the extracted information
    //     console.log('File information:', {
    //       organizationId,
    //       workspaceId,
    //       fileSize,
    //       fileName,
    //     })
    //   }
    // })

    // form.on('fileBegin', (name, file) => {
    //   console.log(`Starting to receive file: ${file.name}`)
    // })

    // form.on('file', (name, file) => {
    //   console.log(`Received file: ${file.name}`)
    // })

    // form.on('end', () => {
    //   res.json({ status: 'File processed successfully' })
    // })
    // const pdfData = ''

    ///

    let pdfData
    const form = new formidable.IncomingForm({})

    const data = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.log('error in formidable')
          reject(err)
          return
        }

        const filesArray = Object.values(files)
        const buffers = []

        organizationId = fields.organizationId
        workspaceId = fields.workspaceId

        for (const file of filesArray) {
          fileSize = file.size
          fileName = file.originalFilename

          const buffer = await fsPromises.readFile(file.filepath)
          await fsPromises.unlink(file.filepath)
          buffers.push(buffer)
        }

        resolve(buffers)
      })
    })

    // pdfData = await pdfParse(data)

    // Parse each buffer and concatenate the text
    const texts = await Promise.all(data.map((buffer) => pdfParse(buffer)))
    const rawDocs = texts
      .map((textData) => {
        console.log('~🌟 here is the section', textData.text)
        return textData.text
      })
      .join(' ')
    // console.log({ rawDocs })
    // const pdfData = { text: 'aa' }
    // const rawDocs = pdfData.text

    ///

    // console.log('here is organizationId', organizationId, workspaceId);

    // TODO: update the file list in firestore

    // const rawDocs = await loader.load();

    console.log('raw docs', rawDocs)

    // remove newlines
    const sanitizedRawDocs = rawDocs.trim().replaceAll('\n', ' ')

    console.log('rawdocs after removing new line', sanitizedRawDocs)

    ///
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    })

    const docs = await textSplitter.splitDocuments([
      new Document({
        pageContent: sanitizedRawDocs,
        metadata: { workspaceId },
      }),
    ])
    console.log('split docs', docs)

    console.log('ingesting to  vector store ...')

    const client = createClient(SUPABASE_URL, SUPABASE_PRIVATE_KEY)

    const embeddings = new OpenAIEmbeddings()

    const store = new SupabaseVectorStore(embeddings, {
      client,
      tableName: 'documents',
    })

    await store.addDocuments(docs)

    console.log('succesfully ingested ' + workspaceId + ' to supabase')

    // update firebase
    const { siteUrl } = configuration.site

    // const updateFileListRes = await axios.post(
    //   `${siteUrl}/api/firebase/updateUploadedFilesListForWorkspace`,
    //   {
    //     fileName,
    //     fileSize,
    //     organizationId,
    //     workspaceId,
    //   }
    // )

    ///

    // res.status(200).json({
    //   success: true,
    //   data: `Successfully ingested single pdf ${fileName} to supabase`,
    // });

    res
      .status(200)
      .send({ message: 'Ingesting file to supabase', sanitizedRawDocs })
  } catch (error) {
    console.log('Error in ingestSinglePdfToSupabase', error, error.message)
    res.status(500).json({
      success: false,
      message: error.message,
      info: 'Error in ingestSinglePdfToSupabase',
    })
  }

  // this is the response
})

export default routes

///

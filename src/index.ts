import {getDatabase, getNotionClient, writeRecord} from "@/util";

// MyIntegration の auth_token を指定する
const authToken = 'authToken'
// 書き込みたい Notion DB の ID を指定する
const databaseId = 'databaseId'

const assembleExampleProperties = (title: string, description: string) => {
  const properties: Record<string, any> = {
    Title: {
      title: [{
        text: {
          content: title
        }
      }],
      type: 'title'
    },
    Description: {
      rich_text: [{
        text: {
          content: description,
        }
      }],
      type: 'rich_text'
    },
  }
  return properties
}

const exec = async () => {
  const notionClient = getNotionClient(authToken)
  // 参照できるか確認する
  const db = await getDatabase(notionClient, databaseId)
  console.log(db)
  await writeRecord(notionClient, {
    parent: {
      database_id: databaseId
    },
    properties: assembleExampleProperties(
      'title01',
      'description01'
    )
  })
}
exec()
  .then(message => console.log('success', message))
  .catch(err => console.log('failed', err))

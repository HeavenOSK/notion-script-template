import {Client, LogLevel} from "@notionhq/client";
import {CreatePageParameters, GetDatabaseResponse} from "@notionhq/client/build/src/api-endpoints";

/// 設定した MyIntegrations の auth token を渡す
export const getNotionClient = (integrationAuthToken: string): Client => {
  return new Client({
    auth: integrationAuthToken,
    logLevel: LogLevel.DEBUG,
  })
}

/// DB との疎通の確認をする
///
/// DB が存在しているにも関わらず、[404] Not Found を受け取った場合は、
/// 以下の原因が考えられる。
///
/// - auth token が DB そのものではなく、親の Page の auth token になっている
/// - DB で MyIntegration を招待できていない
export const getDatabase = async (notionClient: Client, databaseId: string): Promise<GetDatabaseResponse> => {
  return await notionClient.databases.retrieve({
    database_id: databaseId,
  })
}

/// [example]
///
export const writeRecord = async (notionClient: Client, params: CreatePageParameters): Promise<void> => {
  await notionClient.pages.create(params)
}

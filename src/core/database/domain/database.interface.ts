export interface IDatabaseConfigAttributes {
  type?:
    | 'mysql'
    | 'postgres'
    | 'cockroachdb'
    | 'sap'
    | 'mariadb'
    | 'sqlite'
    | 'cordova'
    | 'react-native'
    | 'nativescript'
    | 'sqljs'
    | 'oracle'
    | 'mssql'
    | 'mongodb'
    | 'aurora-mysql'
    | 'aurora-postgres'
    | 'expo'
    | 'better-sqlite3'
    | 'capacitor'
    | 'spanner';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
}

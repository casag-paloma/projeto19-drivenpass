import { Credential, SecureNote, Card, Wifi } from "@prisma/client";

export type ICredentialType = Omit<Credential, 'id'>
export type ISecureNoteType = Omit<SecureNote, 'id'>
export type ICardType = Omit<Card, 'id'>
export type IWifiType = Omit<Wifi, 'id'>
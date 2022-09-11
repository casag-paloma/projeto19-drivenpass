import { Credential, SecureNote, Card, Wifi } from "@prisma/client";

export type ICredentialType = Omit<Credential, 'id'>
export type ICredentialData = Omit<ICredentialType, 'userId'>

export type ISecureNoteType = Omit<SecureNote, 'id'>
export type ISecureNoteData = Omit<ISecureNoteType, 'userId'>

export type ICardType = Omit<Card, 'id'>
export type IWifiType = Omit<Wifi, 'id'>
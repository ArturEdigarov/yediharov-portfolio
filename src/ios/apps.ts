import type { ComponentType } from 'react'
import { profile } from '../data/profile'
import {
  ArchiveArt,
  ContactsArt,
  FilesArt,
  GitHubArt,
  LinkedInArt,
  MailArt,
  PhotosArt,
  ResumeArt,
  SafariArt,
  TerminalArt,
} from './icons'

export type AppId = 'portfolio' | 'gallery' | 'contact' | 'resume' | 'skills' | 'articles' | 'archive'

export interface HomeApp {
  kind: 'app'
  id: AppId
  name: string
  Art: ComponentType
}

// An icon that opens a website instead of an app.
export interface HomeLink {
  kind: 'link'
  id: string
  name: string
  Art: ComponentType
  href: string
}

export type HomeItem = HomeApp | HomeLink

export const homeApps: Record<AppId, HomeApp> = {
  portfolio: { kind: 'app', id: 'portfolio', name: 'Portfolio', Art: FilesArt },
  gallery: { kind: 'app', id: 'gallery', name: 'Gallery', Art: PhotosArt },
  contact: { kind: 'app', id: 'contact', name: 'Contact', Art: ContactsArt },
  resume: { kind: 'app', id: 'resume', name: 'Resume', Art: ResumeArt },
  skills: { kind: 'app', id: 'skills', name: 'Skills', Art: TerminalArt },
  articles: { kind: 'app', id: 'articles', name: 'Live', Art: SafariArt },
  archive: { kind: 'app', id: 'archive', name: 'Archive', Art: ArchiveArt },
}

// The four icons that sit in the dock, then the grid on the home screen.
export const dockItems: HomeApp[] = [homeApps.portfolio, homeApps.gallery, homeApps.contact, homeApps.resume]

export const gridItems: HomeItem[] = [
  homeApps.skills,
  homeApps.articles,
  homeApps.archive,
  { kind: 'link', id: 'email', name: 'Email', Art: MailArt, href: `mailto:${profile.email}` },
  { kind: 'link', id: 'github', name: 'GitHub', Art: GitHubArt, href: profile.github },
  { kind: 'link', id: 'linkedin', name: 'LinkedIn', Art: LinkedInArt, href: profile.linkedin },
]

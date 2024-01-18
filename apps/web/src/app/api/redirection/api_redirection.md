# Documentation de l'API de Redirection

## Endpoint de l'API

```
https://lesbases.anct.gouv.fr/api/redirection
```

## Description

Cette API permet de rediriger les anciennes URL vers les nouvelles URL.

## Paramètres de requête

- `origin`: L'URL d'origine qui doit être redirigée. Cette URL doit être encodée pour être utilisée comme paramètre de requête.

## Exemple de requête

```http
GET https://lesbases.anct.gouv.fr/api/redirection?origin=https%3A%2F%2Flabase.anct.gouv.fr%2Fbase%2F589%3Ftags%3D%26page%3D0
```

Dans cet exemple, l'URL d'origine est `https://labase.anct.gouv.fr/base/589?tags=&page=0`. Cette URL est encodée et utilisée comme paramètre `origin`.

## Réponse

La réponse est une redirection HTTP 301 vers la nouvelle URL.

## Exemple de réponse

```http
HTTP/1.1 301 Moved Permanently
Location: https://lesbases.anct.gouv.fr/bases/france-numerique-ensemble
```

Dans cet exemple, l'URL d'origine est redirigée vers `https://lesbases.anct.gouv.fr/bases/france-numerique-ensemble`.

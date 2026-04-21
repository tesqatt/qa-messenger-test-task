# Тестовое задание на вакансию QA Engineer (Middle+/Senior)

## Общее описание

В данном репозитории находятся:
- краткий анализ сценария
- чек-лист для ручного тестирования
- 4 тест-кейса
- краткое описание API-части
- один E2E-тест на Playwright для основного сценария отправки сообщения.

Сценарий задания относится к веб-клиенту мессенджера, где пользователь должен иметь возможность:
- открыть существующую комнату
- отправить текстовое сообщение
- увидеть это сообщение в ленте

API-эндпоинт в рамках задания:

`PUT /_matrix/client/v3/rooms/{roomId}/send/{eventType}/{txnId}`

Для обычного текстового сообщения:
- `eventType = m.room.message`

---

## Структура репозитория

```text
docs/
  scenario-analysis.md
  manual-testing.md
  api-notes.md
tests/
  send-message.spec.ts
playwright.config.ts
package.json
.gitignore
README.md

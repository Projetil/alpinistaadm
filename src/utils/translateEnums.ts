function translateEnum(service: string): string | undefined {
  switch (service) {
    case "AttackSurface":
      return "Superfície de Ataque";
    case "ThreatIntelligence":
      return "Inteligência de Ameaças";
    case "VulnerabilityManagement":
      return "Gestão de Vulnerabilidade";
    case "PenetrationTesting":
      return "Teste de Intrusão";
    case "ThirdParties":
      return "Terceiros";
    case "Accordance":
      return "Conformidade";
    default:
      return undefined;
  }
}

function translateRiskStatus(status: string): string {
  switch (status) {
    case "Pending":
      return "Pendente";
    case "InProgress":
      return "Em Progresso";
    case "Fixed":
      return "Corrigido";
    case "Accepted":
      return "Aceito";
    case "Retest":
      return "Reteste";
    case "Reopened":
      return "Reaberto";
    default:
      return "Desconhecido";
  }
}

function translateRiskSeverity(status: string): string {
  switch (status) {
    case "Info":
      return "Info";
    case "Low":
      return "Baixo";
    case "Medium":
      return "Médio";
    case "High":
      return "Alto";
    case "Critical":
      return "Critico";
    default:
      return "Desconhecido";
  }
}

export { translateRiskStatus, translateEnum, translateRiskSeverity };

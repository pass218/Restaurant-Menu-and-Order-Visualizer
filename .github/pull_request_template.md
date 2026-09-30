## Description
Provide a concise explanation of the changes introduced in this pull request and the architectural motivation behind them.

Fixes / Closes #(issue_number)

---

## Type of Change
- [ ] 🚀 **Feature**: New application feature or capability
- [ ] 🐛 **Bug Fix**: Non-breaking fix for an identified issue
- [ ] 🔧 **DevOps / CI/CD**: Jenkins pipeline, Dockerfile, or automation updates
- [ ] 🏗️ **Infrastructure as Code**: Terraform module or Ansible role modifications
- [ ] ☸️ **Kubernetes**: Helm chart or K8s manifests update (Deployments, Ingress, HPA)
- [ ] 🔒 **Security**: Vulnerability patching or IAM policy tightening
- [ ] 📝 **Documentation**: Updates to README, deployment guides, or architecture diagrams

---

## Component(s) Impacted
- [ ] `app/` (Frontend, dietary filters, cart logic, Jest tests)
- [ ] `docker/` (Dockerfile, nginx.conf, container hardening)
- [ ] `jenkins/` (Jenkinsfile, pipeline stages, Trivy scanner)
- [ ] `terraform/` (AWS VPC, EKS/EC2, IAM, Security Groups)
- [ ] `ansible/` (Playbooks, roles, inventory, provisioning)
- [ ] `k8s/` (Manifests, HPA, PDB, RollingUpdate strategy)

---

## DevOps & Quality Assurance Checklist
- [ ] **Unit Tests Passed**: `npm test` runs cleanly with 100% pass rate.
- [ ] **Test Coverage**: Coverage threshold maintained (>= 80%).
- [ ] **Lint & Format**: Code adheres to project formatting guidelines.
- [ ] **Container Hardening**: Dockerfile utilizes non-root user and multi-stage build.
- [ ] **Vulnerability Scanning**: Trivy container scan reports 0 CRITICAL vulnerabilities.
- [ ] **No Secrets Committed**: Verified no private keys, `.env`, or `.tfvars` are checked in.
- [ ] **Idempotence Verified**: Terraform `plan` and Ansible playbook runs are idempotent.
- [ ] **Zero-Downtime Ready**: Kubernetes RollingUpdate strategy validated for zero dropped requests.

---

## Verification & Screenshots
Please attach relevant screenshots, test execution outputs, or terminal outputs demonstrating successful deployment and testing:

```bash
# Example test command verification:
npm test -- --coverage
```

---

## Reviewer Notes & Deployment Instructions
*(Optional) Note any environment variable changes, manual database migrations, or AWS parameter updates required upon merging.*

## Desi Tadka: Restaurant Menu & Order Visualizer — Pull Request Template

### Description
Provide a concise overview of the changes in this pull request and the architectural/operational context.

Fixes / Closes #(issue_number)

---

### Type of Change
- [ ] 🚀 **Feature**: New application feature, dietary filter, or UI component
- [ ] 🐛 **Bug Fix**: Non-breaking fix for cart, calculations, or rendering
- [ ] 🍛 **Menu & Assets**: New Indian dishes, WebP images, or recipe updates
- [ ] 🔧 **DevOps / CI/CD**: Jenkins pipeline, Dockerfile, or automation updates
- [ ] 🏗️ **Infrastructure as Code**: Terraform module (VPC, EKS, EC2) or Ansible roles
- [ ] ☸️ **Kubernetes**: Manifests, Ingress (ALB), HPA, PDB, RollingUpdate strategy
- [ ] 🔒 **Security**: Vulnerability remediation or IAM policy hardening
- [ ] 📝 **Documentation**: Architecture guides, diagrams, or runbooks

---

### Component(s) Impacted
- [ ] `app/` (index.html, styles.css, app.js, logic.js, menu.json)
- [ ] `app/images/` (WebP dish images in `app/images/dishes/`)
- [ ] `docker/` (Dockerfile, nginx.conf, container security)
- [ ] `jenkins/` (Jenkinsfile, Trivy scan, Docker Hub push, K8s deploy)
- [ ] `terraform/` (AWS VPC, EKS cluster, EC2 Jenkins/Ansible, IAM)
- [ ] `ansible/` (Playbooks, roles, inventory, node configuration)
- [ ] `k8s/` (Deployment, ClusterIP Service, Ingress, HPA, PDB)
- [ ] `scripts/` (Image optimization and helper scripts)

---

### DevOps & Quality Gate Checklist
- [ ] **Unit Tests Passed**: `npm test` runs with 100% pass rate (32/32 tests).
- [ ] **Currency Standard**: All prices strictly formatted in Indian Rupees (₹), whole numbers. No dollar signs (`$`) present.
- [ ] **Image Asset Verification**:
  - [ ] All new dish photos converted to Google WebP format (`.webp`).
  - [ ] Fixed 600×400 resolution (3:2 aspect ratio).
  - [ ] File size strictly under 80 KB.
  - [ ] Descriptive, non-empty `alt` text provided in `menu.json`.
  - [ ] `app/images/raw/` is NOT committed (verified via `.gitignore`).
- [ ] **Container Hardening**:
  - [ ] Multi-stage Docker build passes.
  - [ ] NGINX runtime runs as unprivileged user (non-root UID 1001).
  - [ ] Trivy vulnerability scan reports 0 CRITICAL vulnerabilities.
- [ ] **Secrets & Security**: Verified no AWS credentials, private keys, `.env`, or `.tfvars` are staged.
- [ ] **Zero-Downtime Deployment**: Kubernetes rolling update strategy preserves service availability.

---

### Verification Proof & Screenshots
```bash
# Verify Jest unit test suite:
cd app && npm test

# Verify all dish images are under 80 KB:
ls -lh app/images/dishes/
```
